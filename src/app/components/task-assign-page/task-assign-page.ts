import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../shared/Material';
// import { taskForm } from '../../model/task-model/task-model.model';
import { EmployeeService } from '../../services/employees/employees.service';
import { GetEmployee, GetEmployeeResponse } from '../../model/employee/employee.model';
import { Task } from '../../model/task/task.model';
import { taskService } from '../../services/task/task.service';



@Component({
  selector: 'app-task-assign-page',
  imports: [ReactiveFormsModule, NgClass, CommonModule,],
  templateUrl: './task-assign-page.html',
  styleUrl: './task-assign-page.scss'
})
export class TaskAssignPage implements OnInit{
    taskForm: FormGroup;
    assigneeOptions!: GetEmployee[];
    // assigneeNames : string[] = [];
    
  constructor(private employeeService : EmployeeService,
    private taskService : taskService,
    private fb: FormBuilder,
    @Inject(MatDialogRef) public dialogRef : MatDialogRef<TaskAssignPage>,
              @Inject(MAT_DIALOG_DATA) public data : any,
  ) {
    this.taskForm = this.fb.group({
      taskId : [],
      taskName: ['', Validators.required],
      description:['', Validators.required],
      isRecurring: [false],
      frequencyPerMonth: [1],
      createdBy : [],
      createdDate : [],
      assignedTo: [null, [Validators.required]],
      assignmentId: [],
      startDate: [],
    });
  }
  ngOnInit(): void {
    this.taskForm.reset({ frequencyPerMonth: 1, isRecurring: false });
    this.getemployeeList();
  }
  
  getemployeeList(): void{
  this.employeeService.getEmployeeList().subscribe({
    next: (employeeServiceResponse: GetEmployeeResponse) =>{
      if(employeeServiceResponse.isSuccess){
        this.assigneeOptions = employeeServiceResponse.employees;
        // this.assigneeNames = this.assigneeOptions.map(emp => emp.fullName);
        // console.log(this.assigneeNames);
      }
    },
    error: () =>{
      console.log('got error');
    }
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

  onCloseClick(): void {
    // You can pass data back to the component that opened the dialog
    this.dialogRef.close('dialog close successful');
  }


  onSubmit(): void {
    if (this.taskForm.valid) {

      const selectedId = this.taskForm.get('assignedTo')?.value;
      console.log(selectedId);
      this.taskForm.patchValue({
      createdBy: 1,
      // assignedTo: Number(this.taskForm.),
      createdDate : new Date().toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
});

  // const formData = this.taskForm.value;
      const formData = new FormData();

   
    formData.append('TaskName', this.taskForm.get('taskName')?.value);
    formData.append('Description', this.taskForm.get('description')?.value);
    formData.append('IsRecurring', (this.taskForm.get('isRecurring')?.value));
    formData.append('FrequencyPerMonth',(this.taskForm.get('frequencyPerMonth')?.value));
    formData.append('CreatedBy', '1');
    formData.append('CreatedDate', new Date().toISOString().split('.')[0]);
    formData.append('AssignedTo', String(this.taskForm.get('assignedTo')?.value));
    formData.append('StartDate', new Date().toISOString().split('.')[0]);
    console.log(' Form Submitted:', formData);

    this.taskService.createTask(formData).subscribe({
      next:(res) =>{
        console.log('task submitted',res)
      },
      error : (error) =>{
        console.error(' Error submitting task', error);
      }
    });
    this.onCloseClick();
      
    } 
    else {
      this.taskForm.markAllAsTouched();
    }
  }
}

