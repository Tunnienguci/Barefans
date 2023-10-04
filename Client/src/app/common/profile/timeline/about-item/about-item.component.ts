import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
})
export class AboutItemComponent {
  user: User = {} as User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  ngDoCheck(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
}
