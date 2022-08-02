import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { RefreshService } from './core/auth/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  constructor(private refreshService: RefreshService) {}

  ngOnInit(): void {
    this.refreshService
      .refreshToken()
      .pipe(catchError(() => of()))
      .subscribe();
  }
}
