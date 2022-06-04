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
export class LoginFormComponent implements OnInit, OnDestroy {
  private _autoLogin = false;
  private _authSub = new Subscription();

  user = '';
  password = '';
  passwordType: 'password' | 'text' = 'password';
  isPasswordShown = false;
  isSigningIn = false;

  constructor(
    private authService: AuthService,
    private autoLoginService: AutoLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._autoLogin = this.autoLoginService.isAutoLoginEnabled();
  }

  ngOnDestroy(): void {
    this._authSub.unsubscribe();
  }

  login(): void {
    this.isSigningIn = true;
    this._authSub = this.authService
      .auth(this.user, this.password)
      .pipe(finalize(() => (this.isSigningIn = false)))
      .subscribe({
        complete: () => this.router.navigate(['home']),
        error: () => alert('Usuário ou senha inválidos'),
      });
  }

  toggleShowPassword(): void {
    this.isPasswordShown = !this.isPasswordShown;
    this.passwordType = this.isPasswordShown ? 'text' : 'password';
  }
  }

  get autoLogin() {
    return this._autoLogin;
  }
  set autoLogin(value) {
    this._autoLogin = value;
    this.autoLoginService.setAutoLogin(this._autoLogin);
  }
}
