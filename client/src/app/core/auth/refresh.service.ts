import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

const API = environment.API_URL;

interface RefreshResponse {
  accessToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  constructor(private http: HttpClient, private userService: UserService) {}

  refreshToken() {
    return this.http.get<RefreshResponse>(`${API}/refresh`).pipe(
      tap((res: RefreshResponse) => {
        const accessToken = res.accessToken ?? '';
        this.userService.setUserToken(accessToken);
      })
    );
  }
}
