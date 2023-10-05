import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
})
export class AboutItemComponent {
  user: User = {} as User;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserByUsername(id).subscribe((data) => {
      this.user = data;
    });
  }

  ngDoCheck(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserByUsername(id).subscribe((data) => {
      this.user = data;
    });
  }
}
