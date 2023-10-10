import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cmt-control',
  templateUrl: './cmt-control.component.html',
  styleUrls: ['./cmt-control.component.scss'],
})
export class CmtControlComponent {
  @Output() commentPost = new EventEmitter<any>();

  formComment: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.commentPost.emit(this.formComment.value.comment);
    this.formComment.reset();
  }
}
