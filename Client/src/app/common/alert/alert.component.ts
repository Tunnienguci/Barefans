import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() myUser: any;
  @Input() receivedUser: any[] = [];
  @Output() acceptFollowRequest = new EventEmitter<any>();
  @Output() recjectFollowRequest = new EventEmitter<any>();

  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  accept(username: string) {
    this.acceptFollowRequest.emit(username);
  }

  reject(username: string) {
    this.recjectFollowRequest.emit(username);
  }
}
