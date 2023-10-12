import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  authUser: any;
  currentUser: any = {};
  currentPage: string = '';
  isLoading: boolean = false;
  currentTab: string = '';
  permission: boolean = false;
  avatarImg: string = '';
  posts: Post[] = [];
  isFriend: boolean = false;
  isRequest: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private cloudinary: CloudinaryService,
    private router: Router
  ) {
    this.isLoading = true;
    this.currentUser = this.userService.curUser;
    this.authUser = this.loginService.authUser;
    if (this.currentPage == this.authUser.account.username) {
      this.permission = true;
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
      this.userService.getUserByUsername(this.currentPage).subscribe((res) => {
        this.currentUser = res;
        this.avatarImg = res.avatar;
        this.userService.curUser = res;
        this.postService
          .getPostByUser(this.currentUser.account.username)
          .subscribe((res) => {
            this.posts = res.posts;
          });
        if (this.currentPage == this.authUser.account.username) {
          this.permission = true;
        }

        this.isFriend = this.currentUser.friends.some((friend: any) => {
          return friend === this.authUser._id.toString();
        });

        this.isRequest = this.currentUser.requests.some((request: any) => {
          console.log(request.receiveRequest, this.authUser._id);
          return request.receiveRequest === this.authUser._id;
        });

        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
    });
  }

  followUser() {
    this.isLoading = true;
    this.userService
      .followUser(this.authUser._id, this.currentUser._id)
      .subscribe((res: any) => {
        if (res) {
          if (res.status == 2) {
            this.isRequest = true;
          }
          this.userService
            .getUserByUsername(this.currentPage)
            .subscribe((res) => {
              this.currentUser = res;
              this.avatarImg = res.avatar;
              this.userService.curUser = res;
              this.postService
                .getPostByUser(this.currentUser.account.username)
                .subscribe((res) => {
                  this.posts = res.posts;
                });
              if (this.currentPage == this.authUser.account.username) {
                this.permission = true;
              }
              setTimeout(() => {
                this.isLoading = false;
              }, 1500);
            });
        }
      });
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // Convert to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.isLoading = true;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('upload_preset', 'barefans');
        data.append('cloud_name', 'dklzco9qq');
        this.cloudinary.uploadImage(data).subscribe((res) => {
          if (res) {
            this.avatarImg = res.url;
            this.userService
              .updateAvatar(this.currentUser._id, this.avatarImg)
              .subscribe((res) => {
                if (res) {
                  localStorage.removeItem('_saBareUser');
                  localStorage.removeItem('_saBareFans');
                  this.isLoading = false;
                  this.router.navigate(['/login']);
                }
              });
          }
        });
      };
    }
  }

  updateDataEvent(e: any) {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
      this.userService.getUserByUsername(this.currentPage).subscribe((res) => {
        this.currentUser = res;
        this.avatarImg = res.avatar;
        this.userService.curUser = res;
        this.postService
          .getPostByUser(this.currentUser.account.username)
          .subscribe((res) => {
            this.posts = res.posts;
          });
        if (this.currentPage == this.authUser.account.username) {
          this.permission = true;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
    });
  }

  createPost(post: any) {
    this.postService.createPost(post).subscribe((res) => {
      this.isLoading = true;
      if (res) {
        this.postService
          .getPostByUser(this.currentUser.account.username)
          .subscribe((res) => {
            this.posts = res.posts;
          });
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    });
  }
}
