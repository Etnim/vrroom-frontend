import { Component } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { Application, ApplicationService } from '../../services/application.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import moment from 'moment/moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    ApplicationDetailsComponent,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    AsyncPipe,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    NgChartsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'lt-US' }
  ]
})
export class AdminDashboardComponent {
  form: FormGroup;
  displayedColumns: string[] = [
    'applicationId',
    'customerName',
    'leasingAmount',
    'applicationCreatedDate',
    'applicationStatus',
    'assignedManager'
  ];
  dataSource: Application[] = [];
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 20];
  isSuperAdmin = false;
  superAdminData: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public numberOfApplicationsChartData: ChartData<'bar'> = {
    labels: ['Number of Applications'],
    datasets: [{ data: [], label: 'Number of Applications' }]
  };
  
  public averageTimesChartData: ChartData<'bar'> = {
    labels: ['Avg Time to Sign or Cancel', 'Avg Time from Submit to Assigned'],
    datasets: [{ data: [], label: 'Average Times (hours)' }]
  };

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.form = this.fb.group({
      customerId: [''],
      managerFullName: [''],
      managerId: [''],
      status: [''],
      sortField: [''],
      sortDir: [''],
      startDate: [''],
      endDate: [''],
      pageNumber: [''],
      pageSize: ['']
    });
    this.dateAdapter.setLocale('lt-US');

    this.form.valueChanges.subscribe(() => this.fetchApplications());
    this.fetchApplications();
  }

  applyPagination(): void {
    const pageNumberValue = this.form.get('pageNumber')?.value ?? 0;
    const pageSizeValue = this.form.get('pageSize')?.value ?? this.pageSize;

    const pageNumber = pageNumberValue ? pageNumberValue - 1 : 0;
    const pageSize = pageSizeValue || this.pageSize;

    this.fetchApplications(pageNumber, pageSize);
  }

  fetchApplications(pageNumber: number = this.currentPage, pageSize: number = this.pageSize) {
    const { customerId, managerFullName, managerId, status, sortField, sortDir, startDate, endDate } =
      this.form.value;
    const formattedStartDate = startDate ? this.formatDate(startDate) : '';
    const formattedEndDate = endDate ? this.formatDate(endDate) : '';

    this.applicationService
      .fetchApplications(
        pageNumber,
        pageSize,
        sortField,
        customerId,
        managerId,
        managerFullName,
        sortDir,
        status,
        formattedStartDate,
        formattedEndDate
      )
      .subscribe({
        next: (data) => {
          console.log('Fetched data:', data);
          this.dataSource = data.content;
          this.totalElements = data.totalElements;
          this.currentPage = data.pageNumber;
          this.pageSize = data.pageSize;
          this.superAdminData = data;
          this.isSuperAdmin = this.isSuperAdminDataAvailable(data);
          this.updateChartData();
        },
        error: (error) => console.error('Failed to fetch applications', error)
      });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    let newDate = new Date(date);
    return newDate instanceof Date && !isNaN(newDate.getTime())
      ? `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${(
          '0' + newDate.getDate()
        ).slice(-2)}T${('0' + newDate.getHours()).slice(-2)}:${('0' + newDate.getMinutes()).slice(
          -2
        )}:${('0' + newDate.getSeconds()).slice(-2)}`
      : '';
  }

  onSort(field: string): void {
    if (this.form.get('sortField')?.value === field) {
      // Toggle the sort direction for the same field
      this.form
        .get('sortDir')
        ?.setValue(this.form.get('sortDir')?.value === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the field and default to ascending for a new field
      this.form.get('sortField')?.setValue(field);
      this.form.get('sortDir')?.setValue('asc');
    }
    this.fetchApplications();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchApplications();
  }

  getRowColor(application: any): string {
    const today = new Date();
    const submissionDate = new Date(application.applicationCreatedDate);
    const diffDays = Math.floor((today.getTime() - submissionDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays >= 5 && application.applicationStatus === 'SUBMITTED') {
      return 'red';
    } else if (diffDays >= 3 && application.applicationStatus === 'SUBMITTED') {
      return 'yellow';
    }
    return '';
  }

  viewDetails(applicationId: string) {
    console.log('Viewing details for:', applicationId);
    this.router.navigate(['/details', applicationId]);
  }

  formatDateString(date: string) {
    return moment(Date.parse(date)).format('YYYY-MM-DD HH:mm:ss');
  }

  parseDurationString(durationString: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const matches = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const [, hoursString, minutesString, secondsString] = matches;
    const hours = hoursString ? parseInt(hoursString, 10) : 0;
    const minutes = minutesString ? parseInt(minutesString, 10) : 0;
    const seconds = secondsString ? parseInt(secondsString, 10) : 0;

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    return { days, hours: remainingHours, minutes, seconds };
  }

  formatDuration(duration: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }): string {
    const parts: string[] = [];
    if (duration.days > 0) {
      parts.push(`${duration.days}d`);
    }
    if (duration.hours > 0 || parts.length > 0) {
      parts.push(`${duration.hours}h`);
    }
    if (duration.minutes > 0 || parts.length > 0) {
      parts.push(`${duration.minutes}m`);
    }
    parts.push(`${duration.seconds}s`);
    return parts.join(' ');
  }

  isSuperAdminDataAvailable(application: any): boolean {
    return (
      application.hasOwnProperty('averageTimeToSignOrCancel') &&
      application.hasOwnProperty('numberOfApplications') &&
      application.hasOwnProperty('averageTimeFromSubmitToAssigned')
    );
  }

  getAverageTimeToSignOrCancel(application: any): string {
    if (this.isSuperAdminDataAvailable(application)) {
      const duration = this.parseDurationString(application.averageTimeToSignOrCancel);
      return this.formatDuration(duration);
    }
    return '';
  }

  getNumberOfApplications(application: any): number {
    if (this.isSuperAdminDataAvailable(application)) {
      return application.numberOfApplications;
    }
    return 0;
  }

  getAverageTimeFromSubmitToAssigned(application: any): string {
    if (this.isSuperAdminDataAvailable(application)) {
      const duration = this.parseDurationString(application.averageTimeFromSubmitToAssigned);
      return this.formatDuration(duration);
    }
    return '';
  }

  updateChartData() {
    
  this.numberOfApplicationsChartData.datasets[0].data = [
    this.getNumberOfApplications(this.superAdminData)
  ];
  this.numberOfApplicationsChartData = { ...this.numberOfApplicationsChartData };

  
  this.averageTimesChartData.datasets[0].data = [
    this.getDurationInHours(this.superAdminData.averageTimeToSignOrCancel),
    this.getDurationInHours(this.superAdminData.averageTimeFromSubmitToAssigned)
  ];
  this.averageTimesChartData = { ...this.averageTimesChartData };
  }

  getDurationInHours(duration: string): number {
    const parsedDuration = this.parseDurationString(duration);
    return parsedDuration.days * 24 + parsedDuration.hours + parsedDuration.minutes / 60;
  }
}
