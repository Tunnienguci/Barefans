import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() id: any;
  @Input() myUser: any;
  @Input() commentList: any;

  constructor(private postService: PostService) {}

  removeComment(idCmt: any) {
    this.postService.removeCommentById(this.id, idCmt);
  }
}
