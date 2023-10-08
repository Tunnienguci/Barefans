import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() myUser: any;
  @Input() receivedUser: any[] = [];
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  acceptFollowRequest(receivedUser: any) {
    this.userService
      .acceptFollowRequest(this.myUser.username, receivedUser)
      .subscribe((res: any) => {
        this.isLoading = true;
        if (res) {
          this.userService
            .getReceivedFollowRequests(this.myUser._id)
            .subscribe((res: any) => {
              if (res) {
                this.receivedUser = res;
                setTimeout(() => {
                  this.isLoading = false;
                }, 1500);
              }
            });
        }
      });
  }

  recjectFollowRequest(id: any) {
    this.userService
      .recjectFollowRequest(this.myUser.username, id)
      .subscribe((res: any) => {
        this.isLoading = true;
        if (res) {
          this.userService
            .getReceivedFollowRequests(this.myUser._id)
            .subscribe((res: any) => {
              if (res) {
                this.receivedUser = res;
                setTimeout(() => {
                  this.isLoading = false;
                }, 1500);
              }
            });
        }
      });
  }
}
