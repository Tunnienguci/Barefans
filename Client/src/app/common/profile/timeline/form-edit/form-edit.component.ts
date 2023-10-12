import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent {
  @Input() userInfo: User;
  @Output() updateData = new EventEmitter<any>();
  isLoading: boolean = false;

  profileForm = this.fb.group({
    fullName: ['', [Validators.required]],
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

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.userInfo = this.loginService.authUser;
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
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const data = {
        ...this.profileForm.value,
      };
      this.loginService
        .updateProfile(data, this.userInfo.account.username)
        .subscribe((res: any) => {
          this.isLoading = true;
          if (res) {
            this.updateData.emit();
            this.isLoading = false;
          }
        });
    }
  }
}
