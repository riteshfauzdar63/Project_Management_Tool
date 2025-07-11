import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../shared/Material';
// import { taskForm } from '../../model/task-model/task-model.model';
import { EmployeeService } from '../../services/employees/employees.service';
import {
  GetEmployee,
  GetEmployeeResponse,
} from '../../model/employee/employee.model';
// import { Task } from '../../model/task/task.model';
import { taskService } from '../../services/task/task.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-assign-page',
  imports: [ReactiveFormsModule, NgClass, CommonModule, MatIconModule],
  templateUrl: './task-assign-page.html',
  styleUrl: './task-assign-page.scss',
})
export class TaskAssignPage implements OnInit {
  taskForm: FormGroup;
  assigneeOptions!: GetEmployee[];
  showFrequency: boolean = false;
  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private taskService: taskService,
    private fb: FormBuilder,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<TaskAssignPage>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      taskId: [],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      isRecurring: [false],
      frequencyPerMonth: [1],
      createdBy: [],
      createdDate: [],
      assignedTo: [null, [Validators.required]],
      assignmentId: [],
      startDate: [],
    });

    this.isEditMode = data?.isEditMode || false;
  }
  ngOnInit(): void {
    this.taskForm.reset({ frequencyPerMonth: 1, isRecurring: false });
    this.getemployeeList();
    this.taskForm.get('isRecurring')?.valueChanges.subscribe(() => {
      this.checkRecurrOption();
    });
  }

  getemployeeList(): void {
    this.employeeService.getEmployeeList().subscribe({
      next: (employeeServiceResponse: GetEmployeeResponse) => {
        if (employeeServiceResponse.isSuccess) {
          this.assigneeOptions = employeeServiceResponse.employees;
          // this.assigneeNames = this.assigneeOptions.map(emp => emp.fullName);
          // console.log(this.assigneeNames);
          if (this.isEditMode && this.data.task) {
            this.taskForm.patchValue({
              taskId: this.data.task.taskId,
              taskName: this.data.task.taskName,
              description: this.data.task.description,
              isRecurring: this.data.task.isRecurring,
              frequencyPerMonth: this.data.task.frequencyPerMonth,
              assignedTo: this.data.task.assignedToEmployeeId,
            });
          }
        }
      },
      error: () => {
        console.log('got error');
      },
    });
  }

  increase(): void {
    let current = this.taskForm.get('frequencyPerMonth')?.value || 0;
    if (current < 4) {
      this.taskForm.get('frequencyPerMonth')?.setValue(current + 1);
    }
  }

  decrease(): void {
    let current = this.taskForm.get('frequencyPerMonth')?.value || 0;
    if (current > 1) {
      this.taskForm.get('frequencyPerMonth')?.setValue(current - 1);
    }
  }

  checkRecurrOption(): void {
    let isREcurr = this.taskForm.get('isRecurring')?.value;
    this.showFrequency = isREcurr == true;
  }

  onCloseClick(): void {
    // You can pass data back to the component that opened the dialog
    this.dialogRef.close('dialog close successful');
  }

  onSubmit(): void {
    debugger;
    if (this.taskForm.valid) {
      this.taskForm.patchValue({
        createdBy: 1,
        createdDate: new Date().toISOString().split('T')[0],
        startDate: new Date().toISOString().split('T')[0],
      });

      const formValue = this.taskForm.getRawValue();
      const formData = new FormData();
      if (formValue.taskId != null) {
        formData.set('TaskId', this.taskForm.get('taskId')?.value);
      }

      formData.set('TaskName', this.taskForm.get('taskName')?.value);
      formData.set('Description', this.taskForm.get('description')?.value);
      formData.set('IsRecurring', this.taskForm.get('isRecurring')?.value);
      formData.set(
        'FrequencyPerMonth',
        this.taskForm.get('frequencyPerMonth')?.value
      );
      formData.set('CreatedBy', '1');
      formData.set('CreatedDate', new Date().toISOString().split('.')[0]);
      formData.set(
        'AssignedTo',
        String(this.taskForm.get('assignedTo')?.value)
      );

      this.taskService.createTask(formData).subscribe({
        next: (res) => {
          console.log('task submitted', res);
        },
        error: (error) => {
          console.error(' Error submitting task', error);
        },
      });
      this.onCloseClick();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
