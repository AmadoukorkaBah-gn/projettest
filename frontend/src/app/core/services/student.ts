import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // URL de base pour l'API Laravel
  private apiUrl = environment.apiUrl + '/students';

  constructor(private http: HttpClient) { }

  // 🔹 Récupérer tous les étudiants
  getStudents(token: string): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders(token) });
  }

  // 🔹 Ajouter un nouvel étudiant
  addStudent(student: any, token: string): Observable<any> {
    return this.http.post(this.apiUrl, student, { headers: this.getHeaders(token) });
  }

  // 🔹 Mettre à jour un étudiant
  updateStudent(id: number, student: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student, { headers: this.getHeaders(token) });
  }

  // 🔹 Supprimer un étudiant
  deleteStudent(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders(token) });
  }

  // 🔹 Méthode privée pour ajouter le token aux headers
  private getHeaders(token: string) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}