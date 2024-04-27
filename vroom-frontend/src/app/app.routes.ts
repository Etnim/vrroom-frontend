import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';
import { SubmissionSuccessComponent } from './components/wizard/submission-success/submission-success.component';
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: WizardComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuardFn] },
  {
    path: 'submission-success',
    component: SubmissionSuccessComponent
  },
  {
    path: 'details/:applicationId',
    component: ApplicationDetailsComponent,
    canActivate: [authGuardFn]
  },
  {
    path: 'login',
    component: LoginButtonComponent
  },
  { path: '**', redirectTo: '' }
];
