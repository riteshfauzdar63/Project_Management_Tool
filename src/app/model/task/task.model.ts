export interface Task {
   taskId: number | null,
  taskName: string,
  description: string,
  isRecurring: boolean,
  frequencyPerMonth: number,
  createdBy: number,
  createdDate: string,
  assignmentId: number | null,
  assignedTo: number,
  startDate: string,
}