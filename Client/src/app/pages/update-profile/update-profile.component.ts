import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {
  userInfo: User = {} as User;
  avatarImg: string = '';
  account: any = {};

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService
  ) {
    const token = localStorage.getItem('_sa-user');
    this.userService.getUserByUsername(String(token)).subscribe((data) => {
      this.userInfo = data;
      this.profileForm.patchValue(this.userInfo);
      this.avatarImg = this.userInfo.avatar || '';
      this.account = {
        username: this.userInfo.account.username,
        password: this.userInfo.account.password,
        permission: '_sa-user',
        token: this.account.token,
      };
      document.getElementById('avatar')?.setAttribute('src', this.avatarImg);
    });
  }

  ngOnInit() {
    this.loginService.getUser().subscribe((data) => {
      this.userInfo = data;
      console.log(this.userInfo);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const data = {
        avatar: this.avatarImg,
        account: this.account,
        ...this.profileForm.value,
      };
      this.userService.updateUser(data as any).subscribe();
      this.loginService.login(data.account);
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file]: any = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.avatarImg = reader.result as string;
        document.getElementById('avatar')?.setAttribute('src', this.avatarImg);
      };
    }
  }
}
