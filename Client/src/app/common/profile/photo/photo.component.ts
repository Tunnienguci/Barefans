import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  albums: any[] = [];
  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe((user: any) => {
      this.albums = user.albums;
    });
  }
}
