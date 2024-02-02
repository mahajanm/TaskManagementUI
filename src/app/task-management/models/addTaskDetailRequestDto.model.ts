export interface AddTaskDetailRequestDto {
    title: string;
    description: string;
    status: string; // Adjust based on your TaskStatus enum
    dueDate: Date;
  }