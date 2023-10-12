import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listPosts: Post[];
  isLoading: boolean = true;
  authUser: User;
  friends: User[] = [];

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private userService: UserService
  ) {
    this.authUser = this.loginService.authUser;
    this.listPosts = this.postService.listPosts;
    if (this.listPosts.length > 0) {
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getListPosts().subscribe((data) => {
      if (data) {
        this.listPosts = data.posts;
      }
    });
    this.userService
      .getFriends(this.authUser.account.username)
      .subscribe((data) => {
        if (data) {
          setTimeout(() => {
            this.friends = data.friends;
            this.isLoading = false;
          }, 1000);
        }
      });
  }

  acceptFollowRequest(receivedUser: any) {}

  recjectFollowRequest(id: any) {}

  createPost(post: any) {
    this.postService.createPost(post).subscribe((res) => {
      this.isLoading = true;
      this.postService.getListPosts().subscribe((data) => {
        if (data) {
          this.listPosts = data.posts;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        }
      });
    });
  }
}
