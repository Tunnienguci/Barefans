import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentUser: any;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
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
      this.currentUser.posts = res;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userService.getUserByUsername(params.id).subscribe((res) => {
        if (res) {
          this.currentUser = res;
          this.postService.getPostByUser(params.id).subscribe((res) => {
            if (res) {
              this.currentUser.posts = res.posts;
              this.isLoading = false;
            }
          });
        }
      });
    });
  }
}
