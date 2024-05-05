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
import { AuthService } from '../../../services/auth.service';
import { Admin, AdminService } from '../../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

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
  managers: Admin[] = [];
  public selectedManagerUid: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService,
    private adminService: AdminService,
    private router: Router,
    public authService: AuthService,
    private dialog: MatDialog
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const applicationId = params.get('applicationId');
      if (applicationId) {
        this.fetchApplicationDetails(applicationId);
      }
    });

    this.fetchManagers();
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
          this.fetchApplicationDetails(this.application.applicationID);
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

  assignToAdmin() {
    if (this.application && this.application.applicationID) {
      this.appService.updateAssignToYourself(this.application.applicationID).subscribe({
        next: (data) => {
          this.fetchApplicationDetails(this.application.applicationID);
          console.log('Admin assigned:', data);
        },
        error: (error) => {
          console.error('Failed to assign yourself', error);
        }
      });
    }
  }

  assignToManager(managerID: string) {
    if (this.application && this.application.applicationID) {
      this.appService.updateAssignToManager(this.application.applicationID, managerID).subscribe({
        next: (data) => {
          this.fetchApplicationDetails(this.application.applicationID);
          console.log('Manager assigned:', data);
        },
        error: (error) => {
          console.error('Failed to assign manager', error);
        }
      });
    }
  }

  viewAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  formatDateString(date: string) {
    return moment(Date.parse(date)).format('YYYY-MM-DD HH:mm:ss');
  }

  fetchManagers() {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.managers = data;
      },
      error: (error) => {
        console.error('Failed to fetch managers', error);
      }
    });
  }

  selectManager(uid: string): void {
    this.selectedManagerUid = uid;
  }

  applyManagerAssignment(): void {
    if (this.selectedManagerUid && this.application?.applicationID) {
      this.assignToManager(this.selectedManagerUid);
      this.selectedManagerUid = null;
    }
  }

  confirmAssignment(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message:
          'Are you sure you want to apply this manager? You are assigned to this application.'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.applyManagerAssignment();
      }
    });
  }
}
