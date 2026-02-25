import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // 🔹 Page par défaut : connexion
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard], 
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'students',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/students/students-module').then(
        (m) => m.StudentsModule
      ),
  },
  { path: '**', redirectTo: 'login' },
];
