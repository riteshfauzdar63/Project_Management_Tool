import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { taskService } from '../../services/task/task.service';
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-task-delete-model',
  imports: [MatDialogContent, MatDialogModule],
  templateUrl: './task-delete-model.html',
  styleUrl: './task-delete-model.scss'
})
export class TaskDeleteModel {
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<TaskDeleteModel>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private taskService: taskService
  ) {}

  onConfirm(): void {
    this.loading = true;
    this.taskService.deleteTask(this.data.taskId).subscribe({
      next: () => {
        this.dialogRef.close(true); // Notify success
      },
      error: () => {
        this.dialogRef.close(false); // Notify failure
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
} 
//  this.taskService.deleteTask(taskId).subscribe({
//     next :() =>{
//       alert('Selected Task is deleted successfully');
//       this.getListData();
//     },
//     error : (err) =>{
//       console.log(err);
//     }
//    })