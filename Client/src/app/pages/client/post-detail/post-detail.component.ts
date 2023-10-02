import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  post: any[] = [];

  constructor(private postService: PostService, route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      this.postService.postDetail(Number(params['id'])).subscribe((res) => {
        this.post = res;
      });
    });
  }

  ngOnInit() {}
}
