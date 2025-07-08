import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class EmployeeService {

     apiUrl: string = "https://localhost:7255/Task/";

     constructor( 
        private httpclient : HttpClient){
     }

     getEmployeeList(): Observable<any>{
        return this.httpclient.get(`${this.apiUrl+'employees'}`);
     }

}