import { Component } from '@angular/core';
import task from '../../data/task.json';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
})
export class ListTaskComponent {
  listTask: any[] = [...task];
}
