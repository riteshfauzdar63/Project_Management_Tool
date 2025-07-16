import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskAssignPage } from '../task-assign-page/task-assign-page';
import { MatDialog } from '../../shared/Material';
import { CommonModule } from '@angular/common';
// import { taskForm } from '../../model/task-model/task-model.model';
import { MatButtonModule } from '@angular/material/button';
import { taskService } from '../../services/task/task.service';
import { Task, TaskResponse } from '../../model/task/task.model';
import { MatTableModule } from '@angular/material/table';
import {
  TaskDetail,
  TaskDetailsResponse,
} from '../../model/task/taskDetails.model';
import { TaskDeleteModel } from '../task-delete-model/task-delete-model';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  tasks!: Task[];
  fillteredTasks!: Task[];
  totalCount: number = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  searchText: string = '';
  taskDetails!: TaskDetail;
  displayedColumns: string[] = [
    'taskName',
    'taskDescription',
    'assignedTo',
    'frequencyPerMonth',
    'isRecurring',
    'taskStatus',
    'actions',
    'Completion',
  ];

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    private router: Router,
    private taskService: taskService
  ) {}


  ngOnInit(): void {
    this.loadTasks();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskAssignPage, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'dialog close successful') {
        this.loadTasks();
      }
    });
  }

  openEditDialog(taskId: number): void {
    this.taskService.getTaskDetails(taskId).subscribe({
      next: (getTaskResponse: TaskDetailsResponse) => {
        if (getTaskResponse.isSuccess) {
          this.taskDetails = getTaskResponse.taskDetail;

          const dialogRef = this.dialog.open(TaskAssignPage, {
            disableClose: true,
            data: {
              isEditMode: true,
              task: this.taskDetails,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result === 'dialog close successful') {
              this.loadTasks();
            }
          });
        }
      },
    });
  }

  onSearch(): void {
  const text = this.searchText.toLowerCase();
  this.fillteredTasks = this.tasks.filter(task =>
    task.taskName.toLowerCase().includes(text)
  );
  this.totalCount = this.fillteredTasks.length;
}

clearSearch(): void {
  this.searchText = '';
  this.onSearch();
}

  loadTasks(): void {
    const request = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.searchText.trim(),
    };

    this.taskService.showTaskList(request).subscribe({
      next: (res: TaskResponse) => {
        if (res.isSuccess) {
          this.tasks = res.tasks;
          this.fillteredTasks = res.tasks;
          this.totalCount = res.totalCount;
        }
      },
      error: (err) => console.error(err),
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadTasks();
  }

  ondeletebtn(taskId: number): void {
    const dialogRef = this.dialog.open(TaskDeleteModel, {
      data: { taskId }, // pass taskId to dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
        this.loadTasks();
      }
    });
  }

  goForCompletion(taskId: number): void {
    this.router.navigate(['taskCompletionPage'], {
      queryParams: { taskId: taskId },
    });
  }

  goForTaskDetails(taskId: number): void {
    this.router.navigate(['taskDetailsPage'], {
      queryParams: { taskId: taskId },
    });
  }
}
