import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  login() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.loginService.login(data);
    }
  }

  register() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      const data: User = {
        id: Math.floor(Math.random() * 100000000000000000),
        fullName: this.loginForm.value.fullname,
        birthday: '',
        avatar:
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4da7488-f077-4995-8bba-db65531de878/d9rpgq9-37d54773-6e51-4714-86a3-d1d9e63c0895.png/v1/fill/w_200,h_200,q_80,strp/_we_bare_bears_ice_bear_by_francisglenndt_d9rpgq9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAwIiwicGF0aCI6IlwvZlwvYTRkYTc0ODgtZjA3Ny00OTk1LThiYmEtZGI2NTUzMWRlODc4XC9kOXJwZ3E5LTM3ZDU0NzczLTZlNTEtNDcxNC04NmEzLWQxZDllNjNjMDg5NS5wbmciLCJ3aWR0aCI6Ijw9MjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.tbZ-9kmcqR5UO5rkkIYNkLsBel4_QBn4P0SgmGkGzJM',
        bio: '',
        email: '',
        hometown: '',
        live: '',
        relationship: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        secondarySchool: '',
        highSchool: '',
        college: '',
        university: '',
        work: {
          company: '',
          position: '',
        },
        posts: [],
        albums: [],
        friends: [],
        requests: [],
        account: {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          permission: '_sa-user',
          token: String(Math.floor(Math.random() * 10) + new Date().getTime()),
        },
        verify: false,
      };

      this.loginService.register(data);
    }
  }
}
