import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      this.isLoading = true;
      this.loginService.login(data).subscribe((res: any) => {
        if (res && res.token) {
          this.loginService.saveToken(res.token, res.username);
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const data = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };
      this.isLoading = true;
      this.loginService.register(data).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('_saBareUser', res.username);
          this.router.navigate([`/update-profile`]);
        }
      });
    }
  }
}
