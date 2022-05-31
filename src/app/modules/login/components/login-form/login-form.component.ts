import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.auth(this.user, this.password).subscribe({
      complete: () => this.router.navigate(['home']),
      error: () => alert('Usuário ou senha inválidos'),
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }
}
