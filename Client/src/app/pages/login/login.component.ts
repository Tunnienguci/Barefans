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
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
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
    if (this.loginForm.valid) {
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.loginService.login(data);
    }
  }

  register() {
    if (this.registerForm.valid) {
      const data = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        fullName: this.registerForm.value.fullname,
      };
      this.loginService.register(data);
    }
  }
}
