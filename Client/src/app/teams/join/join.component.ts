import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent {
  project: FormGroup;

  constructor(private fb: FormBuilder) {
    this.project = this.fb.group({
      projectName: [''],
      startDate: [''],
      endDate: [''],
      typeProject: [''],
      members: [''],
      softwareDevelopment: [''],
      dailyMeetingTime: [''],
      logWorkTime: [''],
      description: [''],
      fileDoc01: [''],
      fileDoc02: [''],
      fileDoc03: [''],
      meetingRoom: [''],
      progressCheck: [''],
      checkingTask: [''],
      github: [''],
      gitlab: [''],
      docker: [''],
      note: [''],
    });
  }

  onSubmit() {
    console.log(this.project.value);
  }
}
