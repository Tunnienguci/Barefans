import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  user: any = {};
  constructor(private loginService: LoginService) {
    this.loginService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.loginService.getUser().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }
}
