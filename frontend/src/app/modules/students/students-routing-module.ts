import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StudentsComponent }, // /students/list
  {
    path: 'add',
    loadComponent: () =>
      import('./add-student/add-student').then((m) => m.AddStudentComponent),
  }, // /students/add
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}