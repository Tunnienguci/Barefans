import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() myUser: any;
  constructor(private router: Router, private loginService: LoginService) {
    // this.myUser = this.loginService.getUser();
    // console.log(this.myUser);
  }

  isHovered = false;

  logout() {
    localStorage.removeItem('_saBareFans');
    localStorage.removeItem('_saBareUser');
    this.router.navigate(['/login']);
  }
}
