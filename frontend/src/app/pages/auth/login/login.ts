import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Email ou mot de passe incorrect');
        },
      });
  }
}
