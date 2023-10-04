import { Component } from '@angular/core';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
})
export class ListTaskComponent {
  listTask: any[] = [
    {
      title: 'Đang chửi BTEC vì làm ăn như cc',
      deadline: '2023-10-10',
      status: 'Đang làm',
      progress: 50,
    },
    {
      title: 'Yêu FPT Software',
      deadline: '2023-12-12',
      status: 'Đang làm',
      progress: 10,
    },
  ];
}
