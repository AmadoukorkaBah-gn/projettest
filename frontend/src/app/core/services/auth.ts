import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => {
        // 🔹 Enregistrer le token côté navigateur après connexion
        if (response?.token && typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap((response: any) => {
        // 🔹 Enregistrer le token côté navigateur après inscription
        if (response?.token && typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: this.getAuthHeaders(token),
      }
    ).pipe(
      tap(() => {
        this.clearToken();
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    // 🔹 Protéger l'accès à localStorage côté serveur (SSR)
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }

  clearToken() {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem('token');
  }

  private getAuthHeaders(token: string | null) {
    return new HttpHeaders(
      token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}
    );
  }
}

