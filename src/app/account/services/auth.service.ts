import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url ="http://localhost:8081/api/auth/"

  constructor(private http:HttpClient ) { }

  register(body): Observable<any> {
    return this.http.post(this.url+'register', body);
  }





  
}
