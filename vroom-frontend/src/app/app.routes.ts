import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';

export const routes: Routes = [
  { path: '', component: WizardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  {
    path: 'details/:applicationId',
    component: ApplicationDetailsComponent
  },
  { path: '**', redirectTo: '' }
];
