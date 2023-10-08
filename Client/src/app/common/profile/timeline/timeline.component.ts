import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private postService: PostService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    // BehaviorSubject
    this.myUser = this.loginService.userData;

    // Subject
    this.userService.currentUser$.subscribe((res) => {
      if (res) {
        this.currentUser = res;
        this.isLoading = false;
      }
    });

    this.postService.userPosts$.subscribe((res) => {
      this.posts = res.reverse();
    });
  }
}
