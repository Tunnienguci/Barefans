import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  myUser: any;
  currentUser: any;
  posts: any;
  permission: boolean = false;
  isLoading: boolean = true;
  private userPostsSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private postService: PostService
  ) {
    this.currentUser = this.userService.currentUser;
    this.myUser = this.loginService.userData;

    if (this.currentUser) {
      this.permission = this.currentUser.username === this.myUser.username;
    }

    this.userPostsSubscription = this.postService
      .getPostByUser(this.currentUser.username)
      .subscribe((res) => {
        this.posts = res.posts;
        this.isLoading = false;
      });

    this.postService.listPosts$.subscribe((userPosts: any[]) => {
      this.posts = userPosts;
    });
  }

  ngOnDestroy() {
    this.userPostsSubscription.unsubscribe();
  }
}
