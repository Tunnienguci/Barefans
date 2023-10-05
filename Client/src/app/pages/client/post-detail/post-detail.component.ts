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
  post: any[] = [];
  isAuth: User = {} as User;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.loginService.getUser().subscribe((data) => {
      this.isAuth = data;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(id).subscribe((res) => {
      this.post = res;
    });
  }
}
