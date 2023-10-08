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

  // Subscription
  private listPostsSubscription: Subscription;
  private myUserSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService
  ) {
    this.listPostsSubscription = this.postService.listPosts$.subscribe(
      (listPosts: any[]) => {
        this.isLoading = true;
        if (listPosts) {
          this.listPosts = listPosts;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );

    this.myUserSubscription = this.loginService.userData$.subscribe(
      (res: any) => {
        this.isLoading = true;
        if (res) {
          this.myUser = res;
          this.userService
            .getReceivedFollowRequests(this.myUser._id)
            .subscribe((res: any) => {
              if (res) {
                this.receivedUser = res;
              }
            });

          this.userService
            .getFriends(this.myUser.username)
            .subscribe((res: any) => {
              if (res) {
                this.friends = res.friends;
              }
            });
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );
  }

  ngOnInit(): void {
    this.listPostsSubscription = this.postService.listPosts$.subscribe(
      (listPosts: any[]) => {
        this.isLoading = true;
        if (listPosts) {
          this.listPosts = listPosts;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      }
    );
    this.loginService.getUser();
  }

  ngOnDestroy(): void {
    this.listPostsSubscription.unsubscribe();
    this.myUserSubscription.unsubscribe();
  }
}
