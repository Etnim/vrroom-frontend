import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment/environment';
import { WizardComponent } from './components/wizard/wizard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationDetailsComponent } from './components/admin-dashboard/application-details/application-details.component';
import { AuthService } from './services/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WizardComponent, AdminDashboardComponent, ApplicationDetailsComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vroom-frontend';
  apiHost = environment.apiHost;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }
}
