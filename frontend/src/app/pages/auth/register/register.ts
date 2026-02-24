import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Erreur lors de l’inscription');
        },
      });
  }
}

