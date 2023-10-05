import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent {
  editBio = false;
  character: number = 0;
  bio: string = '';
  @Input() permission: boolean = false;
  @Input() isAuth: User = {} as User;
  @Input() user: User = {} as User;

  constructor(private userService: UserService) {}

  ngDoCheck(): void {
    this.bio = this.user.bio || '';
  }

  checkCharacter(e: any) {
    this.character = e.target.value.length;
    this.bio = e.target.value;
  }

  editBioToggle() {
    this.editBio = !this.editBio;
    if (!this.editBio) {
      const user = {
        ...this.isAuth,
        bio: this.bio,
      };
      this.userService.updateUser(user).subscribe();
    }
  }
}
