import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  setToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  deleteToken(): void {
    localStorage.removeItem(KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
