import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  listPosts: any[] = [];
  myUser: any;
  receivedUser: any;
  friends: any;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  acceptFollowRequest(receivedUser: any) {}

  recjectFollowRequest(id: any) {}
}
