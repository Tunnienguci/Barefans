import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() myUser: any;

  constructor(private router: Router) {}

  isHovered = false;

  logout() {
    localStorage.removeItem('_saBareFans');
    localStorage.removeItem('_saBareUser');
    this.router.navigate(['/login']);
  }
}
