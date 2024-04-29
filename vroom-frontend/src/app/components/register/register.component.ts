import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {}

  onSubmit(): void {
    console.log('register');
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next: () => {
        // Handle successful registration
        this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }
}
