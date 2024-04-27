import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment/environment';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WizardComponent, AdminDashboardComponent, ApplicationDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vroom-frontend';
  apiHost = environment.apiHost;

  constructor(public auth: AuthService) {}
}
