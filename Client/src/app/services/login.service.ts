import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = {
    username: 'admin',
    password: 'admin',
    permission: 'admin',
  };

  secretKey: string = 'facebook.com';

  constructor(private router: Router) {}

  register(user: any) {
    const data = {
      username: user.username,
      password: user.password,
      permission: 'member',
    };

    this.encodeToken(data);
  }

  login(user: any) {
    // Dùng Guard để kiểm tra đăng nhập
    if (
      user.username === this.user.username &&
      user.password === this.user.password
    ) {
      this.encodeToken(this.user);
      this.router.navigate(['/home']);
    }
  }

  encodeToken(data: any) {
    const token = btoa(`${JSON.stringify(data)}${this.secretKey}`);
    localStorage.setItem('_sa', token);
  }

  decodeToken() {
    const token = localStorage.getItem('_sa');
    if (token) {
      const data = JSON.parse(atob(token.replace(this.secretKey, '')));
      return data;
    }
    return null;
  }
}
