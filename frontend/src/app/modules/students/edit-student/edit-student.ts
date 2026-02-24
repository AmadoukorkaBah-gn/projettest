import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../core/services/student';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css'],
})
export class EditStudentComponent {
  @Input() studentForm!: FormGroup;
  @Input() editId!: number | null;
  @Input() token!: string;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  successMessage = '';
  errorMessage = '';
  editFormSubmitted = false;

  constructor(private studentService: StudentService) {}

  submitEditForm() {
    this.editFormSubmitted = true;
    this.resetMessages();

    if (this.studentForm.invalid || !this.editId) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    this.studentService.updateStudent(this.editId, this.studentForm.value, this.token)
      .subscribe({
        next: () => {
          this.successMessage = 'Étudiant modifié avec succès.';
          this.editFormSubmitted = false;
          this.updated.emit(); // Notifie le parent pour recharger la liste
          this.close.emit();   // Ferme le modal
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Erreur lors de la modification.';
        }
      });
  }

  resetMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}