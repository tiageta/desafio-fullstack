import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AutoLoginService } from 'src/app/core/services/auto-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  private _autoLogin = false;

  user = '';
  password = '';
  passwordType: 'password' | 'text' = 'password';
  showPassword = false;
  isSigningIn = false;

  constructor(
    private authService: AuthService,
    private autoLoginService: AutoLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._autoLogin = this.autoLoginService.isAutoLoginEnabled();
  }

  login(): void {
    this.isSigningIn = true;
    this.authService
      .auth(this.user, this.password)
      .pipe(finalize(() => (this.isSigningIn = false)))
      .subscribe({
        complete: () => this.router.navigate(['home']),
        error: () => alert('Usuário ou senha inválidos'),
      });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  get autoLogin() {
    return this._autoLogin;
  }
  set autoLogin(value) {
    this._autoLogin = value;
    this.autoLoginService.setAutoLogin(this._autoLogin);
  }
}
