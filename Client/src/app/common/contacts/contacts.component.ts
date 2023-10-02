import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  friendList = [
    {
      frName: 'Alden Cantrell',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Kierra Gentry',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Pierre Cox',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Thomas Crane',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Miranda Shaffer',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Bradyn Kramer',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Alvaro Mcgee',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Nicolas Huber',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Caden Lopez',
      frAvatar: 'https://picsum.photos/200/300',
    },
    {
      frName: 'Aldo Mcbride',
      frAvatar: 'https://picsum.photos/200/300',
    },
  ];
}
