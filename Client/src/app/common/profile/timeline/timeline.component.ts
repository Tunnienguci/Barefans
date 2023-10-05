import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isAuth: User = {} as User;
  posts: any[] = [];
  currentUser: User = {} as User;
  permission: boolean = false;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    // Authenticated user
    this.loginService.getUser().subscribe((data) => {
      this.isAuth = data;
    });

    // Posts by user
    this.postService.getPostByUser(String(id)).subscribe((res) => {
      this.posts = res;
    });

    // Get User by username
    this.userService.getUserByUsername(String(id)).subscribe((res) => {
      this.currentUser = res;
    });

    // Check permission to edit
    if (this.isAuth.account.username === this.currentUser.account.username) {
      this.permission = true;
    }
  }

  // [EN]: Triggered when user changes
  ngDoCheck(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Posts by user
    this.postService.getPostByUser(String(id)).subscribe((res) => {
      this.posts = res;
    });

    // Get User by username
    this.userService.getUserByUsername(String(id)).subscribe((res) => {
      this.currentUser = res;
    });

    // Check permission to edit
    if (this.isAuth.account.username === this.currentUser.account.username) {
      this.permission = true;
    }
  }
}
