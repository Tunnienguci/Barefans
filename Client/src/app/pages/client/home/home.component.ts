import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listPosts: Post[];
  isLoading: boolean = false;
  authUser: User;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService
  ) {
    this.authUser = this.loginService.authUser;
    this.listPosts = this.postService.listPosts;
  }

  ngOnInit(): void {}

  acceptFollowRequest(receivedUser: any) {}

  recjectFollowRequest(id: any) {}
}
