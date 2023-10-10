import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authUser: User;
  constructor(private router: Router, private loginService: LoginService) {
    this.authUser = this.loginService.authUser;
  }

  isHovered = false;

  ngOnInit(): void {
    this.authUser = this.loginService.authUser;
  }

  logout() {
    localStorage.removeItem('_saBareFans');
    localStorage.removeItem('_saBareUser');
    this.router.navigate(['/login']);
  }
}
