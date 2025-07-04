import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskAssignPage } from '../task-assign-page/task-assign-page';
import {  MatDialog } from '../../shared/Material'
import { CommonModule } from '@angular/common';
import { taskForm } from '../../model/task-model/task-model.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule, MatButtonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit{
  constructor ( @Inject(MatDialog) private dialogRef : MatDialog){}

   taskList: taskForm[] = [];

  ngOnInit(): void {
   this.getListData();
  }

  openDialog(){
       this.dialogRef.open(TaskAssignPage,{
        disableClose: true,
       });
  }

  getListData():void{
     const data = localStorage.getItem('assignedTasks');
    this.taskList = data ? (JSON.parse(data) as taskForm[]) : [];
  }

  toRemoveData():void{
    localStorage.removeItem('assignmentTask');
  }
    
//  editTask(id: number): void {
//   const tasks = JSON.parse(localStorage.getItem('assignedTasks') || '[]');
//   const task = tasks.find((t: any) => t.id === id);

//   if (task) {
//     this.dialogRef.open(TaskAssignPage, {
//       width: '500px',
//       data: task  // ✅ Pass task data to dialog
//     });
//   }
// }
}

