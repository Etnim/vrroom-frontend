import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [MatButton],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {
  applicationId!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.applicationId = params.get('applicationId')!;
    });
  }

  viewAdminDashboard() {
    this.router.navigate(['/admin']);
  }
}
