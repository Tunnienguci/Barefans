import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  isLoading: boolean = false;
  posts: any;
  authUser: User | null;
  currentPage: string = '';

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.authUser = this.loginService.authUser;
  }

  ngOnInit(): void {
    this.authUser = this.loginService.authUser;
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
      this.postService.getPostById(this.currentPage).subscribe((res) => {
        this.posts = [res.post];
        console.log(this.posts);
      });
    });
  }
}
