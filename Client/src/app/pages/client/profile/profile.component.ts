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
  isAuth: User = {} as User;
  currentUser: User = {} as User;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    // Authenticated user
    this.loginService.getUser().subscribe((data) => {
      this.isAuth = data;
    });

    // Get User by username
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserByUsername(id).subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngDoCheck(): void {
    // Triggered when user changes
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserByUsername(id).subscribe((res) => {
      this.currentUser = res;
    });
  }
}
