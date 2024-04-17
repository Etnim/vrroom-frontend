import { Routes } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: WizardComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: '**', redirectTo: '' }
];
