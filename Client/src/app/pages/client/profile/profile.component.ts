import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  authUser: any;
  currentUser: any = {};
  currentPage: string = '';
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.currentUser = this.userService.curUser;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
      this.userService.getUserByUsername(this.currentPage).subscribe((res) => {
        this.currentUser = res;
        this.userService.curUser = res;
        this.isLoading = false;
      });
    });
  }

  followUser() {}

  findRequest(): boolean {
    if (this.currentUser && this.currentUser.requests) {
      return this.currentUser.requests.some((request: any) => {
        return request.receiveRequest === this.authUser._id;
      });
    }
    return false;
  }
}
