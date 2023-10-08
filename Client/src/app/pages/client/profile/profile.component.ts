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

  private myUserSubscription: Subscription;
  private currentUserSubscription: Subscription;
  private userPostsSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {
    // BehaviorSubject
    this.myUserSubscription = this.loginService.userData$.subscribe(
      (res: any) => {
        this.isLoading = true;
        if (res) {
          this.myUser = res;
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        }
      }
    );

    // Subject
    this.currentUserSubscription = this.userService.currentUser$.subscribe(
      (res) => {
        this.isLoading = true;
        if (res) {
          this.currentUser = res;
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        }
      }
    );

    this.userPostsSubscription = this.postService.userPosts$.subscribe(
      (res) => {
        this.isLoading = true;
        if (res) {
          this.currentUser.posts = res;
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        }
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userService.getUserByUsername(params.id).subscribe();
      this.postService.getPostByUser(params.id).subscribe();
    });
    this.loginService.getUser();
  }

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

  ngOnDestroy(): void {
    this.myUserSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
    this.userPostsSubscription.unsubscribe();
  }
}
