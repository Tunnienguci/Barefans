import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.loginService.register(data);
    }
  }
}
