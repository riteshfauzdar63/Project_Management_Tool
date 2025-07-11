import { Component, OnInit } from '@angular/core';
import { taskSummary, taskSummaryResponse } from '../../model/task-summary/task-summary.model';
import { taskService } from '../../services/task/task.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task-summary-page',
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './task-summary-page.html',
  styleUrl: './task-summary-page.scss'
})
export class TaskSummaryPage implements OnInit{
  TaskSummary!: taskSummary[];
    totalCount: number = 0;
    pageSize: number = 10;
    pageNumber: number = 1;
    searchText: string = '';
     displayedColumns: string[] = [
    'taskId',
    'taskName',
    'taskDescription',
    'assignedTo',
    'actualCount',
    'expectedCount',
    'taskStatus',
  ];

    constructor(private taskService: taskService,){
    }

  ngOnInit(): void {
    this.loadTasksSummary();
  }
  loadTasksSummary(): void {
      const request = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search: this.searchText.trim(),
      };
  
      this.taskService.showTaskSummary(request).subscribe({
        next: (res: taskSummaryResponse) => {
          if (res.isSuccess) {
            this.TaskSummary = res.summaries;
            this.totalCount = res.totalCount;
          }
        },
        error: (err) => console.error(err),
      });
    }

     onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadTasksSummary();
  }

  onSearch(): void {
    debugger;
    this.pageNumber = 1;
    this.loadTasksSummary();
  }
}
