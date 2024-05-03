import { Component } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  navigateToMain() {
    this.router.navigate(['']);
  }

  navigateToApplication() {
    this.router.navigate(['/car-lease']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateToAboutUs() {
    this.router.navigate(['/about-us']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  loginToAdmin() {
    this.navigateToLogin();
  }

  logoutFromAdmin() {
    this.authService.logout();
    this.navigateToLogin();
  }

  checkIfLoggedIn() {
    return this.authService.currentUserSig() !== null;
  }
}
