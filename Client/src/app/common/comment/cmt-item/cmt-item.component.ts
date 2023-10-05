import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cmt-item',
  templateUrl: './cmt-item.component.html',
  styleUrls: ['./cmt-item.component.scss'],
})
export class CmtItemComponent {
  @Input() postId: any;
  @Input() commentList: any[] = [];
  @Output() removeCmt = new EventEmitter<any>();

  calculateTime(time: any) {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    if (hours > 24) {
      return date.toDateString();
    } else if (hours > 0) {
      return hours + ' hours ago';
    } else if (minutes > 0) {
      return minutes + ' minutes ago';
    } else if (seconds > 0) {
      return seconds + ' seconds ago';
    } else {
      return 'Just now';
    }
  }

  removeComment(id: any) {
    this.removeCmt.emit(id);
  }
}
