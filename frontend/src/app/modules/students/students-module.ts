import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing-module';
import { StudentsComponent } from './students/students';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    StudentsComponent,
  ],
})
export class StudentsModule {}
