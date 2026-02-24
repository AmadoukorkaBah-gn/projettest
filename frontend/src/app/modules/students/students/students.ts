import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student';
import { AuthService } from '../../../core/services/auth';
import { EditStudentComponent } from '../edit-student/edit-student';  
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EditStudentComponent],
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  studentForm!: FormGroup;
  token = '';
  editId: number | null = null;
  isEditModalOpen = false;
  successMessage = '';
  errorMessage = '';
  editFormSubmitted = false;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken() || '';
    this.initForm();
    this.loadStudents();
  }

  private initForm() {
    this.studentForm = this.fb.group({
      name: [''],
      prenom: [''],
      date_naissance: [''],
      adresse: [''],
      tel: [''],
      pere: [''],
      mere: [''],
    });
  }

  loadStudents() {
    this.studentService.getStudents(this.token).subscribe((data) => {
      this.students = data;
    });
  }

  openEditModal(student: any) {
    this.editId = student.id;
    this.studentForm.patchValue(student);
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editId = null;
    this.studentForm.reset();
  }

  deleteStudent(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return;
    this.studentService.deleteStudent(id, this.token).subscribe(() => {
      this.loadStudents();
    });
  }
}