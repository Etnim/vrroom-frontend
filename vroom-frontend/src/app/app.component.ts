import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment/environment';
import { WizardComponent } from './components/wizard/wizard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WizardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vroom-frontend';
  apiHost = environment.apiHost;
}
