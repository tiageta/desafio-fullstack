import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  auth(userName: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        `${API}/user/login`,
        {
          userName,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.userService.setUserToken(authToken);
        })
      );
  }
}
