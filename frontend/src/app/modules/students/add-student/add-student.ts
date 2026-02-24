import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../../core/services/student';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  token = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken() || '';
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      pere: ['', Validators.required],
      mere: ['', Validators.required],
    });
  }

  submitAddForm() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.studentForm.invalid) return;
    this.studentService.addStudent(this.studentForm.value, this.token).subscribe({
      next: () => {
        this.studentForm.reset();
        this.successMessage = 'Étudiant ajouté avec succès';
        this.router.navigate(['/students']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de l’ajout';
      },
    });
  }
}