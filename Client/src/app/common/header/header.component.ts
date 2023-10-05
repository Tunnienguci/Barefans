import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isAuth: any = {};
  constructor(private router: Router) {}

  isHovered = false;

  logout() {
    localStorage.removeItem('_sa');
    this.router.navigate(['/login']);
  }
}
