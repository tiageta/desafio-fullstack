import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  user = '';
  password = '';
  autoLogin = false;
  passwordType: 'password' | 'text' = 'password';
  showPassword = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['home']);
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }
}
