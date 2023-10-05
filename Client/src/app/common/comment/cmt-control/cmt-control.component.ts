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
  comment: string = '';
  formComment: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  user: any = {};
  constructor(
    private postService: PostService,
    private loginService: LoginService
  ) {
    this.loginService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  onSubmit() {
    if (this.formComment.valid) {
      const comment = {
        id: Date.now(),
        user: this.user,
        content: this.formComment.value.comment,
        time: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
      };
      this.postService.addComment(this.postId, comment).subscribe((data) => {
        this.comment = '';
        this.formComment.reset();
      });
    }
  }
}
