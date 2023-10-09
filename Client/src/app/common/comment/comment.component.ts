import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentPage: string = '';

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
    });
  }

  removeComment(idCmt: any) {
    this.postService.removeCommentById(this.id, idCmt);
  }
}
