import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private router: Router) {}

  managerAccess() {
    this.router.navigate(['/login']);
  }
  clientAccess() {
    this.router.navigate(['/car-lease']);
  }
}
