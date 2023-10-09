import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  // Data from parent component
  authUser: User | undefined;
  currentUser: User | undefined;
  posts: any[] = [];
  isLoading: boolean = true;
  permission: boolean = false;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService
  ) {
    this.permission = this.authUser?._id === this.currentUser?._id;
    this.authUser = this.loginService.authUser;
    this.currentUser = this.userService.curUser;
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }
}
