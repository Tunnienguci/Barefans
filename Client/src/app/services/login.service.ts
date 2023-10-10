import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import jwt from 'jwt-decode';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // DataStore
  private baseAPI: string = environment.apiUrl;
  private TOKEN_KEY = '_saBareFans';
  authUser: User | any = {};

  // Constructor
  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem(this.TOKEN_KEY);
    let username = localStorage.getItem('_saBareUser');
    if (token) {
      let userObj: User = jwt(token);
      this.authUser = userObj;
      if (username == this.authUser.username) {
        this.router.navigate(['']);
      } else {
        localStorage.removeItem('_saBareFans');
        localStorage.removeItem('_saBareUser');
        alert('Please login again');
        this.router.navigate(['/login']);
      }
    }
  }

  // [POST] /auth/login
  login(data: any) {
    return this.http.post(`${this.baseAPI}/auth/sign-in`, data);
  }

  // [POST] /auth/register
  register(data: any) {
    return this.http.post(`${this.baseAPI}/auth/sign-up`, data);
  }

  // [POST] /auth/register/update-profile
  updateProfile(data: any, username: string) {
    return this.http.post(
      `${this.baseAPI}/auth/sign-up/update-profile?username=${username}`,
      data
    );
  }

  // Process save token
  saveToken(token: string, username: string) {
    let decodeJwt: User = jwt(token);
    this.authUser = decodeJwt;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem('_saBareUser', username);
    this.router.navigate([`/`]);
  }
}
