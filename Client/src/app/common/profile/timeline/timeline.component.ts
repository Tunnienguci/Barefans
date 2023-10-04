import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  listPosts: any[] = [];

  constructor(private postService: PostService) {
    this.postService.getListPosts().subscribe((data) => {
      this.listPosts = data;
    });
  }
}
