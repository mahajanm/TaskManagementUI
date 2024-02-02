import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TaskDetail, TaskStatus } from '../../models/taskdetail.model';
import { AddTaskDetailRequestDto } from '../../models/addTaskDetailRequestDto.model';
import { formatDate } from '@angular/common';
import { UpdateTaskDetailRequestDto } from '../../models/updateTaskDetailRequestDto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  id: string | null = null;
  isEditMode: boolean = false;
  task: any = {};
  currentAction: string = "Create New Task"

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadTaskDetails(this.id);
        this.isEditMode = true;
        this.currentAction = "Edit Task";
      }
    });
  }

  loadTaskDetails(id: string): void {
    this.taskService.getTaskById(id).subscribe(task => {

      this.task = task;

      this.task.dueDate = formatDate(this.task.dueDate, 'yyyy-MM-dd', 'en-US');
    });
  }

  onAddOrUpdateTask(form: NgForm): void {
    let status:string = form.value.status;

    if (this.id) {
      const updateTask: UpdateTaskDetailRequestDto = {
        title: form.value.title,
        description: form.value.description,
        status: status.toString(),
        id: this.id
      };
   
      this.taskService.updateTask(this.id, updateTask).subscribe(() => {
        this.toastr.success('Task Details Updated Successfully!', 'Success');
        this.router.navigate(['/app/taskDetail']);
      });

      this.taskService.updateTask(this.id, updateTask).subscribe({
        next: () => {
          this.toastr.success('Task Details Updated Successfully!', 'Success');
          this.router.navigate(['/app/taskDetail']);
        },
        error: (error) => {
          if (error.status === 400) {
            console.log(error);
            const errorMessage = error.error || 'Validation error occurred';
            this.toastr.error(errorMessage, 'Validation Error');
          } else {
            this.toastr.error('An unexpected error occurred. Please try again.', 'Error');
          }
        }
      });

    } else {

      const newTask: AddTaskDetailRequestDto = {
        title: form.value.title,
        description: form.value.description,
        status: status.toString(),
        dueDate: form.value.dueDate,
      };

     
      this.taskService.addTask(newTask).subscribe({
        next: () => {
          this.toastr.success('New Task Completed Successfully!', 'Success');
          this.router.navigate(['/app/taskDetail']);
        },
        error: (error) => {
          if (error.status === 400) {
            console.log(error);
            const errorMessage = error.error || 'Validation error occurred';
            this.toastr.error(errorMessage, 'Validation Error');
          } else {
            this.toastr.error('An unexpected error occurred. Please try again.', 'Error');
          }
        }
      });
    }
  }



}
