import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendsComponent {
  @Input() frName: string = '';
  @Input() frAvatar: string = '';
  @Input() frStatus: boolean = false;
  @Input() frUsername: string = '';
}
