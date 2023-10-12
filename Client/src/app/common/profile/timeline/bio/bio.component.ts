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
  @Input() bio: string = '';
  @Input() permission: boolean = false;
  @Input() myUser: any;
  @Input() currentUser: any;

  constructor(private userService: UserService) {}

  checkCharacter(e: any) {
    this.character = e.target.value.length;
    this.bio = e.target.value;
  }

  editBioToggle() {
    this.editBio = !this.editBio;
    if (!this.editBio) {
      this.userService.updateBio(this.bio, this.myUser._id).subscribe((res) => {
        if (res) {
          this.userService.curUser.bio = this.bio;
        }
      });
    }
  }
}
