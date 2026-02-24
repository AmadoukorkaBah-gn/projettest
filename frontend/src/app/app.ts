import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
})
export class App {
  isAuthRoute = false;

  constructor(private authService: AuthService, private router: Router) {
    // 🔹 Déterminer si on est sur une route d'auth (login/register)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute =
          event.urlAfterRedirects.startsWith('/login') ||
          event.urlAfterRedirects.startsWith('/register');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.authService.clearToken();
        this.router.navigate(['/login']);
      },
    });
  }
}