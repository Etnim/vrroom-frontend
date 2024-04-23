import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';
import { SubmissionSuccessComponent } from './components/wizard/submission-success/submission-success.component';
export const routes: Routes = [
  { path: '', component: WizardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  {
    path: 'submission-success',
    component: SubmissionSuccessComponent
  },
  {
    path: 'details/:applicationId',
    component: ApplicationDetailsComponent
  },

  { path: '**', redirectTo: '' }
];
