import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  ListMenu = [
    {
      icon: 'fa-newspaper',
      link: '/news',
    },
    {
      icon: 'fa-calendar',
      link: '/date',
    },
    {
      icon: 'fa-bookmark',
      link: '/save',
    },
    {
      icon: 'fa-clapperboard',
      link: '/video',
    },
    {
      icon: 'fa-envelope-open',
      link: '/support',
    },
    {
      icon: 'fa-gear',
      link: '/settings',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
