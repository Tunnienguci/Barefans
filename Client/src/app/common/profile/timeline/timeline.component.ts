import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  // Data from parent component
  @Input() authUser: any;
  @Input() currentUser: any;
  @Input() posts: any[] = [];
  @Input() permission: boolean = false;
  @Output() updateData = new EventEmitter<any>();
  @Output() newPost = new EventEmitter<any>();

  updateDataEvent(e: any) {
    this.updateData.emit();
  }

  createPost(post: any) {
    this.newPost.emit(post);
  }
}
