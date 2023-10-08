import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnDestroy {
  myUser: any;
  currentUser: any;
  posts: any;
  permission: boolean = false;
  isLoading: boolean = true;
  private currentUserSubscription: Subscription;
  private userPostsSubscription: Subscription;
  private myUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private loginService: LoginService
  ) {
    // BehaviorSubject
    this.myUserSubscription = this.loginService.userData$.subscribe(
      (res: any) => {
        if (res) {
          this.myUser = res;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );

    // Subject
    this.currentUserSubscription = this.userService.currentUser$.subscribe(
      (res) => {
        if (res) {
          this.currentUser = res;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );

    this.userPostsSubscription = this.postService.userPosts$.subscribe(
      (res) => {
        if (res) {
          this.posts = res.reverse();
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.userPostsSubscription.unsubscribe();
    this.myUserSubscription.unsubscribe();
  }
}
