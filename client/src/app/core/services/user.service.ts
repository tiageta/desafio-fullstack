import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { LogoutService } from './logout.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({});

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private logoutService: LogoutService
  ) {
    if (this.tokenService.hasToken()) {
      this.updateUser();
    }
  }

  private updateUser(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  setUserToken(token: string): void {
    this.tokenService.setToken(token);
    this.updateUser();
  }

  logout(): void {
    this.router.navigate(['/']);
    this.tokenService.deleteToken();
    this.userSubject.next({});
    this.logoutService.handleLogout();
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }
}
