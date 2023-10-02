import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listPosts: any[] = [];
  constructor(private postService: PostService) {
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
