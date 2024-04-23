import { Component } from '@angular/core';
import { AsyncPipe, NgStyle, formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ApplicationService, Application } from '../../services/application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgStyle, MatTableModule, MatPaginator, ApplicationDetailsComponent, AsyncPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  displayedColumns: string[] = [
    'applicationId',
    'applicantName',
    'leasingAmount',
    'dateOfSubmission',
    'applicationStatus',
    'assignedManager',
    'details'
  ];
  dataSource: Application[] = []; // DataSource will be populated by fetchApplications method
  totalApplications = 0;
  applicationsPerPage = 20;
  currentPage = 1;
  pageSizeOptions = [10, 20, 50];

  

  constructor(private appService: ApplicationService, private router: Router) {
    this.fetchApplications();
  }

  fetchApplications() {
    this.appService.fetchApplications(this.currentPage - 1, this.applicationsPerPage).subscribe({
      next: (data) => {
        this.dataSource = data.content;
        this.totalApplications = data.totalElements;
      },
      error: (error) => console.error('Failed to fetch applications', error)
    });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.applicationsPerPage = pageData.pageSize;
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
