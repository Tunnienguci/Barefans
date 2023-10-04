import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  friendList: any[] = [
    // {
    //   frName: 'Nguyễn Văn A',
    //   frAvatar: 'https://picsum.photos/200/300',
    // },
  ];
  constructor() {}
}
