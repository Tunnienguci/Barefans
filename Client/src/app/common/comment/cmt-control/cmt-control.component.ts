import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() commentPost = new EventEmitter<any>();

  comment: string = '';
  currentPage: string = '';

  formComment: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.commentPost.emit(this.formComment.value.comment);
    this.formComment.reset();
  }
}
