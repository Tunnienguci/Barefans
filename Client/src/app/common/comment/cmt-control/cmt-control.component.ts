import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  currentPage: string = '';

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.currentPage = params.id;
    });
  }

  onSubmit() {
    if (this.formComment.valid) {
      const comment = {
        id: this.postId,
        user: this.myUser,
        content: this.formComment.value.comment,
      };
      this.postService.commentPost(comment, this.currentPage);
      this.formComment.reset();
    }
  }
}
