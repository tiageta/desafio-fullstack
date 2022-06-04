import { Injectable } from '@angular/core';

const KEY = 'autoLogin';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginService {
  isAutoLoginEnabled(): boolean {
    return localStorage.getItem(KEY) === 'true';
  }

  setAutoLogin(value: boolean) {
    localStorage.setItem(KEY, String(value));
  }
}
