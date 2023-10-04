import { Component } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent {
  editBio = false;
  character: number = 0;
  checkCharacter(e: any) {
    this.character = e.target.value.length;
  }

  editBioToggle() {
    this.editBio = !this.editBio;
  }
}
