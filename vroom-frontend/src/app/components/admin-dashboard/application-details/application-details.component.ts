import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ApplicationService } from '../../../services/application.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationControlPanelComponentComponent } from './application-control-panel-component/application-control-panel-component.component';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [
    MatButton,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ApplicationControlPanelComponentComponent,
    MatSelectModule
  ],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {
  application: any = null;
  managersStatuses: string[] = ['UNDER_REVIEW','WAITING_FOR_SIGNING', 'REJECTED'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const applicationId = params.get('applicationId');
      if (applicationId) {
        this.fetchApplicationDetails(applicationId);
      }
    });
  }

  fetchApplicationDetails(id: string) {
    this.appService.getApplicationDetails(id).subscribe({
      next: (data) => {
        this.application = data;
      },
      error: (error) => {
        console.error('Failed to fetch application details', error);
      }
    });
  }

  updateStatus(status: string) {
    if (this.application && this.application.applicationID) {
      this.appService.updateApplicationStatus(this.application.applicationID, status).subscribe({
        next: (data) => {
          this.application.applicationStatus = status;
          console.log('Status updated:', data);
        },
        error: (error) => {
          console.error('Failed to update application status', error);
        }
      });
    } else {
      console.error('Invalid application data:', this.application);
    }
  }

  viewAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  formatDateString(date: string) {
    return moment(Date.parse(date)).format('YYYY-MM-DD HH:mm:ss');
  }
}
