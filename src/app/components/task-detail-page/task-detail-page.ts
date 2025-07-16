import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { taskService } from '../../services/task/task.service';
import { TaskDetail, TaskDetailsResponse } from '../../model/task/taskDetails.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail-page',
  imports: [CommonModule],
  templateUrl: './task-detail-page.html',
  styleUrl: './task-detail-page.scss'
})
export class TaskDetailPage implements OnInit{
    task!: TaskDetail;
   constructor(
    private activateRouter: ActivatedRoute,
    private taskService: taskService,
    private route : Router,
  ){}

  ngOnInit(): void {
    this.activateRouter.queryParams.subscribe((params) => {
      const taskId = params['taskId'];
      this.getTaskDetails(taskId);
    });
  }

   getTaskDetails(taskId: number): void {
      this.taskService.getTaskDetails(taskId).subscribe({
        next: (taskDetailsResponse: TaskDetailsResponse) => {
          if (taskDetailsResponse.isSuccess) {
            this.task = taskDetailsResponse.taskDetail;
          }
        },
        error: (err)=>{
          console.log(err);
        }
      });
    }

    gotoHome(): void{
 this.route.navigate(['/taskAssignPage']);
}
}
