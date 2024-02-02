import { Component, OnInit } from '@angular/core';
import { TaskDetail } from '../../models/taskdetail.model';
import { TaskService } from '../../services/task-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { UpdateTaskDetailRequestDto } from '../../models/updateTaskDetailRequestDto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  tasks: TaskDetail[] = [];

  p: number = 1;

  constructor(private taskService: TaskService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadTask()
  }

  loadTask() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        this.toastr.error('An unexpected error occurred while loading task details. Please try again.', 'Error');
      }
    });
  }

  editTask(id: any) {

    const valueTobePassed: NavigationExtras = {
      queryParams: {
        id: id
      }
    };

    this.router.navigate(['app/edit'], valueTobePassed);
  }

  deleteTask(id: any) {
    this.taskService.deleteTask(id).subscribe((tasks) => {
      this.toastr.success('Task Deleted Successfully!', 'Success');
      this.loadTask();
    });
  }

  checkCurrentStatus(status: any) {
    return (status != 2) ? true : false;
  }

  displayStatus(status: any) {
    switch (status) {
      case 0:
        return "To Do"
        break;
      case 1:
        return "In Progress"
        break;
      case 2:
        return "Done"
        break;
      default:
        return "Invalid"
        break;
    }
  }

  markAsDone(task: any) {
    //calling existing update API
    const updateTask: UpdateTaskDetailRequestDto = {
      title: task.title,
      description: task.description,
      status: 'Done',
      id: task.id
    };

    this.taskService.updateTask(task.id, updateTask).subscribe({
      next: () => {
        this.toastr.success('Task marked as Completed!', 'Success');
        this.loadTask();
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