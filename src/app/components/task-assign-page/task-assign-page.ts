import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../shared/Material';
import { taskForm } from '../../model/task-model/task-model.model';

@Component({
  selector: 'app-task-assign-page',
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './task-assign-page.html',
  styleUrl: './task-assign-page.scss'
})
export class TaskAssignPage implements OnInit{
    taskForm: FormGroup;
    assigneeOptions: string[] = ['Ritesh', 'Ananya', 'Rahul', 'Neha', 'Vikram'];
    
  constructor(private fb: FormBuilder,
    @Inject(MatDialogRef) public dialogRef : MatDialogRef<TaskAssignPage>,
              @Inject(MAT_DIALOG_DATA) public data : any,
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      assigneeName: ['', [Validators.required, Validators.maxLength(40)]],
      repeatCount: [1],
      isRecurring: [false],
    });
  }
  ngOnInit(): void {
    this.taskForm.reset({ repeatCount: 1, isRecurring: false });
  }
  

  isNameInvalid(): boolean {
    const control = this.taskForm.get('assigneeName');
    return control?.touched && control?.invalid && control?.errors?.['required'];
  }

  increase(): void {
    let current = this.taskForm.get('repeatCount')?.value || 1;
    if (current < 4) {
      this.taskForm.get('repeatCount')?.setValue(current + 1);
    }
  }

  decrease(): void {
    let current = this.taskForm.get('repeatCount')?.value || 1;
    if (current > 1) {
      this.taskForm.get('repeatCount')?.setValue(current - 1);
    }
  }

  onCloseClick(): void {
    // You can pass data back to the component that opened the dialog
    this.dialogRef.close('dialog close successful');
  }


  onSubmit(): void {
    if (this.taskForm.valid) {

      const formData: taskForm = this.taskForm.value;
    console.log(' Form Submitted:', formData);

    const existingTask: taskForm[] = JSON.parse(localStorage.getItem('assignedTasks') || "[]");
    existingTask.push(formData);
    localStorage.setItem('assignedTasks', JSON.stringify(existingTask));
    this.onCloseClick();
      
    } 
    else {
      this.taskForm.markAllAsTouched();
    }
  }
}

