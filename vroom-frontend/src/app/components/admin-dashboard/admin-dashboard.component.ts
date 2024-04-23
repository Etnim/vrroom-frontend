import { Component } from '@angular/core';
import { AsyncPipe, NgStyle, formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ApplicationService, Application, ApiResponse } from '../../services/application.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
    'assignedManager',
    'details'
  ];
  dataSource: Application[] = [];
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 20];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.form = this.fb.group({
      managerId: [''],
      status: [''],
      sortField: [''],
      sortDir: [''],
      startDate: [''],
      endDate: [''],
      pageNumber: [''],
      pageSize: [''],
    });
    this.dateAdapter.setLocale('lt-US');
    
    this.form.valueChanges.subscribe(() => this.fetchApplications());
    this.fetchApplications();
  }

  applyPagination(): void {
    // Retrieve the values from the form
    const pageNumberValue = this.form.get('pageNumber')?.value ?? 0;
    const pageSizeValue = this.form.get('pageSize')?.value ?? this.pageSize;
  
    // Convert page number from 1-based to 0-based for the backend
    const pageNumber = pageNumberValue ? pageNumberValue - 1 : 0;
    const pageSize = pageSizeValue || this.pageSize; // Use current page size if none provided
  
    // Call the backend API with the new page number and size
    this.fetchApplications(pageNumber, pageSize);
  }

  fetchApplications(pageNumber: number = this.currentPage, pageSize: number = this.pageSize) {
    const { managerId, status, sortField, sortDir, startDate, endDate } = this.form.value;
    const formattedStartDate = startDate ? this.formatDate(startDate) : '';
    const formattedEndDate = endDate ? this.formatDate(endDate) : '';
    
    this.applicationService.fetchApplications(
      pageNumber,
      pageSize,
      sortField, 
      managerId, 
      sortDir, 
      status, 
      formattedStartDate, 
      formattedEndDate
    ).subscribe({
      next: (data) => {
        this.dataSource = data.content;
        this.totalElements = data.totalElements;
        this.currentPage = data.pageNumber;
        this.pageSize = data.pageSize;
      },
      error: (error) => console.error('Failed to fetch applications', error)
    });
  }
  
  private formatDate(date: any): string {
    if (!date) return '';
    let d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime()) ? `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}` : '';
  }
  

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchApplications();
  }

  getRowColor(application: any): string {
    const today = new Date();
    const submissionDate = new Date(application.dateOfSubmission);
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
}
