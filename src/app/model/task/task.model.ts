export interface Task {
  taskId: number,
  taskName: string,
  description: string,
  isRecurring: boolean,
  frequencyPerMonth: number,
  createdBy: number,
  createdDate: string,
  assignmentId: number | null,
  assignedTo: string,
  startDate: string,
}

export interface TaskResponse {
    tasks : Task[],
    totalCount: number,
    isSuccess: boolean,
     error : string[],  
}