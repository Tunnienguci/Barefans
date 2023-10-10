import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  isLoading: boolean = false;
  authUser: any = null;

  constructor(private loginService: LoginService) {
    this.authUser = this.loginService.authUser;
  }

  ngOnInit(): void {
    this.authUser = this.loginService.authUser;
  }
}
