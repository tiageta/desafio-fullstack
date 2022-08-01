import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { RefreshService } from '../auth/refresh.service';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  constructor(
    private refreshService: RefreshService,
    private userService: UserService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // If Unauthorized, refresh token and try again
      catchError((error) => {
        if (error.status !== 401) throw error;
        return this.refreshService.refreshToken().pipe(
          switchMap(() => next.handle(request)),
          // If it fails again, logout
          catchError((error) => {
            this.userService.logout();
            throw error;
          })
        );
      })
    );
  }
}
