import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() id: any;
  commentList: any[] = [];

  constructor(private postService: PostService) {
    if (this.id) {
      this.postService.getListComments(this.id).subscribe((data) => {
        this.commentList = data;
      });
    }
  }

  ngDoCheck() {
    if (this.id) {
      this.postService.getListComments(this.id).subscribe((data) => {
        this.commentList = data;
      });
    }
  }

  removeComment(idCmt: any) {
    this.postService.removeComment(this.id, idCmt).subscribe((data) => {
      this.commentList = data;
    });
  }
}
