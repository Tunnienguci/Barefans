import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  // Data from parent component
  @Input() authUser: any;
  @Input() currentUser: any;
  @Input() posts: any[] = [];
  @Input() permission: boolean = false;
}
