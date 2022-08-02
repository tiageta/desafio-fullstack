import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private http: HttpClient) {}

  async handleLogout() {
    try {
      await firstValueFrom(this.http.get(`${API}/logout`));
    } catch (error) {
      console.error(error);
    }
  }
}
