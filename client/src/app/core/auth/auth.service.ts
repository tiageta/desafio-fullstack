import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

interface ResponseBody {
  accessToken?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  auth(
    username: string,
    password: string
  ): Observable<HttpResponse<ResponseBody>> {
    return this.http
      .post(
        `${API}/login`,
        {
          username,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const accessToken = res.body?.accessToken ?? '';
          this.userService.setUserToken(accessToken);
        })
      );
  }
}
