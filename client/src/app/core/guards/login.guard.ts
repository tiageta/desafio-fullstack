import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  loginGuardHandle(): boolean {
    if (!this.userService.isLoggedIn()) return true;
    this.router.navigate(['home']);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.loginGuardHandle();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.loginGuardHandle();
  }
}
