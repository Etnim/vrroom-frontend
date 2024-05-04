import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submission-success',
  standalone: true,
  imports: [ RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './submission-success.component.html',
  styleUrl: './submission-success.component.scss'
})
export class SubmissionSuccessComponent {

}
