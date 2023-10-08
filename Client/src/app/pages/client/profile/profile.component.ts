import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  myUser: any;
  currentUser: any;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.myUser = this.loginService.userData;

    this.route.params.subscribe((params) => {
      this.userService.getUserByUsername(params['id']).subscribe((res) => {
        if (res) {
          this.currentUser = res;
          this.userService.currentUser = res;
          this.isLoading = false;
        }
      });
    });
  }
}
