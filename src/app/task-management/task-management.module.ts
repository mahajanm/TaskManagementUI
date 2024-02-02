import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskManagementComponent } from './task-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '', component: TaskManagementComponent, children: [
      { path: '', redirectTo: 'taskDetail', pathMatch: 'full' },
      { path: 'taskDetail', component: TaskListComponent },
      { path: 'create', component: AddTaskComponent },
      { path: 'edit', component: AddTaskComponent }
    ]
  }
];

@NgModule({
  declarations: [
    TaskListComponent,
    AddTaskComponent,
    TaskManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  exports: [TaskManagementComponent]
})

export class TaskManagementModule { }
