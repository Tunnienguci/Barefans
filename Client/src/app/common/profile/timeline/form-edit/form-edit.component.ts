import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent {
  profileForm = this.fb.group({
    fullName: ['', [Validators.required]],
    username: [''],
    birthday: [''],
    hometown: [''],
    live: [''],
    relationship: [''],
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedin: [''],
    secondarySchool: [''],
    highSchool: [''],
    college: [''],
    university: [''],
    work: this.fb.group({
      company: [''],
      position: [''],
    }),
  });

  userInfo: User = {} as User;

  constructor(public fb: FormBuilder, private userService: UserService) {
    this.userService.getUser().subscribe((data) => {
      this.userInfo = data;
    });

    this.profileForm.patchValue(this.userInfo);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value as any).subscribe();
    }
  }
}
