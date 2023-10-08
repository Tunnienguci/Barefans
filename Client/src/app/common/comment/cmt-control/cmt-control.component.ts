import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-cmt-control',
  templateUrl: './cmt-control.component.html',
  styleUrls: ['./cmt-control.component.scss'],
})
export class CmtControlComponent {
  @Input() postId: any;
  @Input() myUser: any;

  comment: string = '';
  formComment: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  constructor(private postService: PostService) {}

  onSubmit() {
    if (this.formComment.valid) {
      const comment = {
        id: this.postId,
        user: this.myUser,
        content: this.formComment.value.comment,
      };
      this.postService.commentPost(comment);
      this.formComment.reset();
    }
  }
}
