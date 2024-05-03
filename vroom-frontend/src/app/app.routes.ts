import {Routes} from '@angular/router';
import {WizardComponent} from './components/wizard/wizard.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {
  ApplicationDetailsComponent
} from './components/admin-dashboard/application-details/application-details.component';
import {SubmissionSuccessComponent} from './components/wizard/submission-success/submission-success.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {MainPageComponent} from './components/main-page/main-page.component';
import {LogoutComponent} from "./logout/logout.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(['admin']);

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },

  {
    path: 'car-lease',
    component: WizardComponent
  },

  {
    path: 'submission-success',
    component: SubmissionSuccessComponent
  },
  {
    path: 'details/:applicationId',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectAuthorizedToHome}
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {path: '**', redirectTo: ''}
];
