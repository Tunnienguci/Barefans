import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listPosts: any[] = [];
  isAuth: any = {};
  constructor(
    private loginService: LoginService,
    private postService: PostService
  ) {
    this.loginService.getUser().subscribe((data) => {
      this.isAuth = data;
    });

    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }

  ngOnInit() {
    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }

  ngOnChanges() {
    this.postService.getListPosts().subscribe((res) => {
      this.listPosts = res;
    });
  }
}
