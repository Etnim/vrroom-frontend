import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';
import { SubmissionSuccessComponent } from './components/wizard/submission-success/submission-success.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  { path: '', component: WizardComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  {
    path: 'submission-success',
    component: SubmissionSuccessComponent
  },
  {
    path: 'details/:applicationId',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: '' }
];
