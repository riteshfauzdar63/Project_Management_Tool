import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskResponse } from "../../model/task/task.model";
import { taskSummaryResponse } from "../../model/task-summary/task-summary.model";
// import { Task } from "../../model/task/task.model";




@Injectable({
    providedIn : 'root'
})


export class taskService{
     apiUrl: string = "https://localhost:7255/Task/";

     constructor( 
        private httpclient : HttpClient){
     }

      createTask( body: FormData): Observable<any> {
    return this.httpclient.post(`${this.apiUrl + 'createTask'}`, body);
  }

  showTaskList(body : {pageNumber : Number, pageSize: Number, search: string}): Observable<TaskResponse>{
    return this.httpclient.post<TaskResponse>(`${this.apiUrl + 'list'}`, body);
  }

  showTaskSummary(body : {pageNumber : Number, pageSize: Number, search: string}): Observable<taskSummaryResponse>{
    return this.httpclient.post<taskSummaryResponse>(`${this.apiUrl + 'Summarydashboard'}`, body);
  }

  getTaskDetails(taskId:number): Observable<any>{
    return this.httpclient.get(`${this.apiUrl + taskId}`)
  };

  deleteTask(taskId: number): Observable<any>{
    return this.httpclient.delete(`${this.apiUrl + taskId}`);
  };

  saveCompleteTask(payload: any): Observable<any>{
    return this.httpclient.post<any>(`${this.apiUrl + 'completeTask'}`, payload);
  }
}