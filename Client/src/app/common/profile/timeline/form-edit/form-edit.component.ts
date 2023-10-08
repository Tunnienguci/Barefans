import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent {
  @Input() userInfo: User = {} as User;

  profileForm = this.fb.group({
    fullName: ['', [Validators.required]],
    username: ['', [Validators.required]],
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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm.patchValue({
      fullName: this.userInfo.fullName,
      birthday: this.userInfo.birthday?.split('/').reverse().join('-'),
      hometown: this.userInfo.hometown,
      live: this.userInfo.live,
      relationship: this.userInfo.relationship,
      facebook: this.userInfo.facebook,
      twitter: this.userInfo.twitter,
      instagram: this.userInfo.instagram,
      linkedin: this.userInfo.linkedin,
      secondarySchool: this.userInfo.secondarySchool,
      highSchool: this.userInfo.highSchool,
      college: this.userInfo.college,
      university: this.userInfo.university,
      work: {
        company: this.userInfo.work?.company,
        position: this.userInfo.work?.position,
      },
      username: this.userInfo.account?.username,
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      fullName: this.userInfo.fullName,
      birthday: this.userInfo.birthday?.split('/').reverse().join('-'),
      hometown: this.userInfo.hometown,
      live: this.userInfo.live,
      relationship: this.userInfo.relationship,
      facebook: this.userInfo.facebook,
      twitter: this.userInfo.twitter,
      instagram: this.userInfo.instagram,
      linkedin: this.userInfo.linkedin,
      secondarySchool: this.userInfo.secondarySchool,
      highSchool: this.userInfo.highSchool,
      college: this.userInfo.college,
      university: this.userInfo.university,
      work: {
        company: this.userInfo.work?.company,
        position: this.userInfo.work?.position,
      },
      username: this.userInfo.account?.username,
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const data = {
        ...this.userInfo,
        ...this.profileForm.value,
      };
    }
  }
}
