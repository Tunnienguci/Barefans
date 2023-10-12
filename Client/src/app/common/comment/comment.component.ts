import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() id: any;
  @Input() commentList: any;
  @Input() myUser: any;
  isLoading: boolean = false;

  constructor(private postService: PostService) {}

  removeComment(idCmt: any) {
    this.postService.removeCommentById(this.id, idCmt).subscribe((res: any) => {
      this.isLoading = true;
      if (res) {
        this.commentList.splice(
          this.commentList.findIndex((item: any) => item._id === idCmt),
          1
        );
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }

  submitComment(event: any) {
    const data: any = {
      id: this.id,
      user: this.myUser,
      content: event,
    };
    this.postService.commentPost(data).subscribe((res: any) => {
      this.isLoading = true;
      if (res) {
        this.commentList.push(res.comment);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }
}
