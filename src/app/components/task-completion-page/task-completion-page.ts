import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import {
  TaskDetail,
  TaskDetailsResponse,
} from '../../model/task/taskDetails.model';
import { taskService } from '../../services/task/task.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-completion-page',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './task-completion-page.html',
  styleUrl: './task-completion-page.scss',
})
export class TaskCompletionPage implements OnInit {
  completionForm: FormGroup;
  taskDetails!: TaskDetail;

  constructor(
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private taskService: taskService
  ) {
    this.completionForm = this.fb.group({
      taskId: [{ value: '', disabled: true }],
      employeeId: [{ value: '', disabled: true }],
      taskName: [{ value: '', disabled: true }],
      assignedToName: [{ value: '', disabled: true }],
      feedback: ['', Validators.required],
    });
  }

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
          this.taskDetails = taskDetailsResponse.taskDetail;

             this.completionForm.patchValue({
              taskId: this.taskDetails.taskId,
              taskName: this.taskDetails.taskName,
              assignedToName: this.taskDetails.assignedToEmployeeName,
              employeeId: this.taskDetails.assignedToEmployeeId
            });
        }
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    if (this.completionForm.valid) {
      const formValue = this.completionForm.getRawValue();

      const formData = new FormData();
      formData.set('TaskId', String(formValue.taskId));
      formData.set('EmployeeId', String(formValue.employeeId));
      formData.set('Remarks', formValue.feedback);

      // Call API to complete task
      this.taskService.saveCompleteTask(formData).subscribe({
        next: ()=>{
          console.log('task completion successsful');

        },
        error: (err)=>{
          console.error('Task completion Failed', err);
        }
      });
    }
  }
}
