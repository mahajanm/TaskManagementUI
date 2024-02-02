export interface TaskDetail {
    id?: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
  }

  export enum TaskStatus {
    ToDo = "0",
    InProgress = "1",
    Done = "2"
  }