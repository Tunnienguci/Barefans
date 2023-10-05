import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import user from '../data/users.json';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: User[] = user;
  secretKey: string = 'facebook.com';

  constructor(private router: Router) {}

  register(user: any) {
    this.users.push(user);
    localStorage.setItem('_sa-user', user.account.username);
    this.router.navigate(['/update-profile']);
  }

  login(data: any) {
    this.users.filter((user) => {
      if (
        user.account.username === data.username &&
        user.account.password === data.password
      ) {
        this.encodeToken(user);
        this.router.navigate(['/']);
      }
    });
  }

  getUser(): Observable<User> {
    return new Observable((observer) => {
      const token = localStorage.getItem('_sa');
      const user = this.users.find(
        (user) => btoa(user.account.token) === token?.replace('_sa', '')
      );
      console.log(user);
      observer.next(user);
      observer.complete();
    });
  }

  encodeToken(data: any) {
    const token = btoa(data.account.token);
    localStorage.setItem('_sa', token);
  }
}
