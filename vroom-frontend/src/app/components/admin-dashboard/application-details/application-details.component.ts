import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ApplicationService } from '../../../services/application.service';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [MatButton, MatTableModule, MatTabsModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {
  application: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
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

  viewAdminDashboard() {
    this.router.navigate(['/admin']);
  }
}
