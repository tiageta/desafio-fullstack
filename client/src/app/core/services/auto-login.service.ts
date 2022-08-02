import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const KEY = 'autoLogin';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginService {
  constructor(private cookieService: CookieService) {}

  isAutoLoginEnabled(): boolean {
    return this.cookieService.get('rememberme') === 'true';
  }

  setAutoLogin(value: boolean): void {
    this.cookieService.set('rememberme', String(value));
  }
}
