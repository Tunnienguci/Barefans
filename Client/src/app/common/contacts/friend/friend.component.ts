import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent {
  @Input() frName: string = '';
  @Input() frAvatar: string = '';
  @Input() frStatus: boolean = false;
}
