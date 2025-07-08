import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}