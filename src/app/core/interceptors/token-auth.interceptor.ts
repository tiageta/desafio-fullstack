import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.hasToken()) {
      /* Not needed by the API, only included because it was printing on screen I did not send it haha */
      const token = this.tokenService.getToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
