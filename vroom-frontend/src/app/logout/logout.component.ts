import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });

  }

}

