import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-assign-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './task-assign-page.html',
  styleUrl: './task-assign-page.scss'
})
export class TaskAssignPage {
    taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      assigneeName: ['', [Validators.required, Validators.maxLength(40)]],
      repeatCount: [1],
      isRecurring: [false, [Validators.requiredTrue]],
    });
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

  onSubmit(): void {
    if (this.taskForm.valid) {

      const formData = this.taskForm.value;
   
    console.log(' Form Submitted:', formData);
    localStorage.setItem('assignedTask', JSON.stringify(formData));
      this.taskForm.reset({ repeatCount: 1, isRecurring: false });
      
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}

