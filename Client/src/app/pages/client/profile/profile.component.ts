import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  coverImg =
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.6435-9/121063948_2794584217455057_3662184703383542093_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=19026a&_nc_ohc=MAh_VwSp49gAX_Lryh6&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAjMFTJUvtPvmK9DfL5tY3WYQbXyKEncdD2wEVNs0mUJQ&oe=6543F321';
  avatar =
    'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/375977329_3593526804227457_1894341850510545590_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=Qmt18iCMMrwAX_a3jo9&_nc_ht=scontent.fhan14-3.fna&oh=00_AfBcSCvvNu9B8m5I5zi89-8cLKE4FytbVKxZXTvaU61g9g&oe=6520D370';

  userInfo: User = {} as User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe((data) => {
      this.userInfo = data;
    });
  }

  ngDoCheck(): void {
    this.userService.getUser().subscribe((data) => {
      this.userInfo = data;
    });
  }
}
