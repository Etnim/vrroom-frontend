import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgStyle, formatDate } from '@angular/common';
import { MatStartDate } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface Application {
  applicationId: string;
  applicantName: string;
  leasingAmount: number;
  dateOfSubmission: string;
  applicationStatus: string;
  assignedManager: string;
}

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [NgStyle, MatTableModule, MatPaginator],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {


  displayedColumns: string[] = ['applicationId', 'applicantName', 'leasingAmount', 'dateOfSubmission', 'applicationStatus', 'assignedManager', 'details'];
  dataSource: Application[] = []; // DataSource will be populated by fetchApplications method
  totalApplications = 0; 
  applicationsPerPage = 20;
  currentPage = 1;
  pageSizeOptions = [10, 20, 50];

  constructor() {
    this.fetchApplications();
  }

  fetchApplications() {
    // Simulated data fetch function
    const applications = Array.from({length: 50}, (_, index) => ({
      applicationId: `${index + 1}`,
      applicantName: `Applicant ${index + 1}`,
      leasingAmount: 25000 + (index * 1000),
      dateOfSubmission: formatDate(new Date(Date.now() - 86400000 * (index % 10)), 'yyyy-MM-dd', 'en'),
      applicationStatus: ['SUBMITTED', 'UNDER_REVIEW', 'PENDING_CHANGES', 'PENDING_REVIEW', 'WAITING_FOR_SIGNING', 'SIGNED', 'REJECTED', 'CANCELLED'][index % 8],
      assignedManager: `Manager ${index % 10}`
    }));
    
    this.dataSource = applications.sort((a, b) => new Date(b.dateOfSubmission).getTime() - new Date(a.dateOfSubmission).getTime());
    this.totalApplications = this.dataSource.length;
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
    else if (application.applicationStatus === 'SIGNED') {
      return 'green';
    }
    return '';
  }

  viewDetails(applicationId: string) {
    console.log('Viewing details for:', applicationId);
    // Here you can implement the logic to navigate or open a modal/dialog with application details
  }
}
