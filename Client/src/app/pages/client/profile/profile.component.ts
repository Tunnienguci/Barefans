import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  myUser: any;
  currentUser: any = {};
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  followUser() {
    this.userService.followUser(
      this.myUser.username,
      this.currentUser.username
    );
  }

  findRequest(): boolean {
    if (this.currentUser && this.currentUser.requests) {
      return this.currentUser.requests.some((request: any) => {
        return request.receiveRequest === this.myUser._id;
      });
    }
    return false;
  }
}
