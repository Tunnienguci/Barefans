import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // DataStore
  private baseAPI: string = environment.apiUrl;
  private TOKEN_KEY = '_saBareFans';
  private user: any;

  // Constructor
  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem(this.TOKEN_KEY);
    let username = localStorage.getItem('_saBareUser');
    if (token) {
      let userObj: any = jwt(token);
      this.user = userObj.username;
      if (username == this.user) {
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
    return this.http.post(`${this.baseAPI}/auth/login`, data);
  }

  // [POST] /auth/register
  register(data: any) {
    return this.http.post(`${this.baseAPI}/auth/register`, data);
  }

  // [POST] /auth/register/update-profile
  updateProfile(data: any, username: string) {
    return this.http.post(
      `${this.baseAPI}/auth/register/update-profile?username=${username}`,
      data
    );
  }

  // [GET] /auth/myuser?username=${username}
  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseAPI}/auth/myuser?username=${username}`);
  }

  // Process save token
  saveToken(token: string) {
    let userObj: any = jwt(token);
    this.user = userObj.username;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem('_saBareUser', this.user);
  }
}
