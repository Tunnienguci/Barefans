import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `http://localhost:5000/api/user?username=${username}`
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `http://localhost:5000/api/user/${user.id}`,
      user
    );
  }
}
