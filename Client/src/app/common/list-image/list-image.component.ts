import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.scss'],
})
export class ListImageComponent {
  @Input() imageList: any[] = [];
  @Input() videoList: any[] = [];
  @Input() editable: boolean = false;

  removeImg(index: any) {
    this.imageList.splice(index, 1);
  }

  removeVideo(index: any) {
    this.videoList.splice(index, 1);
  }

  ngOnInit(): void {}
}
