import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskDetail } from '../models/taskdetail.model';
import { Observable } from 'rxjs';
import { AddTaskDetailRequestDto } from '../models/addTaskDetailRequestDto.model';
import { UpdateTaskDetailRequestDto } from '../models/updateTaskDetailRequestDto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.taskApiUrl;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskDetail[]> {
    return this.http.get<TaskDetail[]>(this.apiUrl);
  }

  getTaskById(id: string): Observable<TaskDetail> {
    return this.http.get<TaskDetail>(`${this.apiUrl}/${id}`);
  }

  addTask(task: AddTaskDetailRequestDto): Observable<AddTaskDetailRequestDto> {
    return this.http.post<AddTaskDetailRequestDto>(this.apiUrl, task);
  }

  updateTask(id: string, task: UpdateTaskDetailRequestDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
