import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
})
export class AboutItemComponent {
  @Input() currentUser: any;
  @Input() myUser: any;
}
