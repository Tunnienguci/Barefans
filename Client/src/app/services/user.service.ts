import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  public currentUser$: Observable<any | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User>(`http://localhost:5000/api/user?username=${username}`)
      .pipe(
        tap((user: User) => {
          this.currentUserSubject.next(user);
        })
      );
  }
}
