import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {
  userInfo: User = {} as User;
  avatarImg: any = '';
  isLoading: boolean = false;

  profileForm = this.fb.group({
    fullName: ['', [Validators.required]],
    birthday: [''],
    hometown: [''],
    avatar: ['', [Validators.required]],
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
    private loginService: LoginService,
    private router: Router,
    private cloudinary: CloudinaryService
  ) {}

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const username: any = localStorage.getItem('_saBareUser');
      const data: any = {
        ...this.profileForm.value,
      };
      this.loginService.updateProfile(data, username).subscribe((res: any) => {
        if (res) {
          localStorage.removeItem('_saBareUser');
          this.isLoading = false;
          this.router.navigate(['/login']);
        }
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // Convert to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.isLoading = true;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('upload_preset', 'barefans');
        data.append('cloud_name', 'dklzco9qq');
        this.cloudinary.uploadImage(data).subscribe((res) => {
          if (res) {
            this.avatarImg = res.url;
            this.isLoading = false;
            this.profileForm.patchValue({
              avatar: this.avatarImg,
            });
          }
        });
      };
    }
  }
}
