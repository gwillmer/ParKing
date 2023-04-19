import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    phoneNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/profile';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url);
  }
}