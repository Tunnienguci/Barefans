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
  myUser: any;
  isLoading: boolean = true;

  constructor(
    private loginService: LoginService,
    private postService: PostService
  ) {
    this.myUser = this.loginService.getUser().subscribe((res: any) => {
      this.myUser = res.user;
    });

    this.postService.listPosts$.subscribe((listPosts: any[]) => {
      this.listPosts = listPosts.reverse();
      this.isLoading = false;
    });
  }
}
