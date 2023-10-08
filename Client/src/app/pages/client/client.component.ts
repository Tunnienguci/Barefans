import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  myUser: any;
  isLoading: boolean = true;
  constructor(private loginService: LoginService) {
    this.loginService.getUser().subscribe((res: any) => {
      if (res) {
        this.loginService.userData = res.user;
        this.myUser = this.loginService.userData;
        this.isLoading = false;
      }
    });
  }
}
