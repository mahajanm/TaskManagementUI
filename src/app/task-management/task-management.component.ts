import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/app/taskDetail'])
  }
}
