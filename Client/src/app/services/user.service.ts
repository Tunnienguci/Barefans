import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import Users from '../data/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [...Users];

  constructor() {}

  getUserByUsername(id: string): Observable<User> {
    return new Observable((observer) => {
      const user = this.users.find((user) => user.account.username === id);
      observer.next(user);
      observer.complete();
    });
  }

  updateUser(user: User): Observable<User> {
    return new Observable((observer) => {
      const index = this.users.findIndex(
        (item) => item.account.username === user.account.username
      );
      this.users[index] = user;
      observer.next(user);
      observer.complete();
    });
  }

  getUserByToken(token: string): Observable<User> {
    return new Observable((observer) => {
      const user = this.users.find(
        (user) => user.account.token === token.replace('_sa', '')
      );
      observer.next(user);
      observer.complete();
    });
  }
}
