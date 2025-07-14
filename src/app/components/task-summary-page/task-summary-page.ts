import { Component, OnInit } from '@angular/core';
import { taskSummary, taskSummaryResponse } from '../../model/task-summary/task-summary.model';
import { taskService } from '../../services/task/task.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../services/employees/employees.service';
import { GetEmployee, GetEmployeeResponse } from '../../model/employee/employee.model';


@Component({
  selector: 'app-task-summary-page',
  imports: [MatTableModule,MatPaginatorModule,DatePipe,MatFormFieldModule,MatIconModule,FormsModule,CommonModule,MatInputModule, MatSelectModule],
  templateUrl: './task-summary-page.html',
  styleUrl: './task-summary-page.scss'
})
export class TaskSummaryPage implements OnInit{
  TaskSummary!: taskSummary[];
    assigneeOptions!: GetEmployee[];
  fillteredTasks!: taskSummary[];
  selectedEmployee: string = '';
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
    'taskMonth',
    'taskStatus',
  ];


    constructor(private taskService: taskService,
      private employeeService: EmployeeService,
    ){
    }

  ngOnInit(): void {
    this.loadTasksSummary();
    this.getemployeeList();
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
            this.fillteredTasks = res.summaries;
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
  const text = this.searchText.toLowerCase();
  this.fillteredTasks = this.TaskSummary.filter(task =>
    task.assignedEmployee.toLowerCase().includes(text) &&
    (this.selectedEmployee ? task.assignedEmployee === this.selectedEmployee : true)
  );
  this.totalCount = this.fillteredTasks.length;
}


clearSearch(): void {
  this.searchText = '';
  this.onSearch();
}

 getemployeeList(): void {
    this.employeeService.getEmployeeList().subscribe({
      next: (employeeServiceResponse: GetEmployeeResponse) => {
        if (employeeServiceResponse.isSuccess) {
          this.assigneeOptions = employeeServiceResponse.employees;
        }
      },
      error: () => {
        console.log('got error');
      },
    });
  }


selectedValue(event: MatSelectChange): void {
  this.selectedEmployee = event.value;
  this.onSearch();
}


}
