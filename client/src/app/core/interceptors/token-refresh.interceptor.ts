import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  catchError,
  finalize,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { RefreshService } from '../auth/refresh.service';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  isRefreshingToken = false;

  tokenRefreshedSource = new Subject<void>();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private refreshService: RefreshService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Handles response normally once
    return next.handle(request).pipe(
      catchError((error) => {
        // Invalid token error
        if (error.status === 401) {
          // If error comes from refresh, do not try again
          if (request.url === `${API}/refresh`) throw error;
          // Try to refresh token and attempt again
          return this.refreshToken().pipe(
            switchMap(() => next.handle(request)),
            catchError((err) => {
              // Error again; logout and abort
              if (err.status === 401) this.handleLogout();
              throw err;
            })
          );
        }
        // Access denied, refresh token expired; logout
        else if (error.status === 403) this.handleLogout();

        throw error;
      })
    );
  }

  refreshToken(): Observable<any> {
    // Handles parallel requests
    if (this.isRefreshingToken) {
      // If busy, returns halted observable until tokenRefreshed$ is nexted
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          // unhalts observer
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.isRefreshingToken = true;

      return this.refreshService.refreshToken().pipe(
        finalize(() => (this.isRefreshingToken = false)),
        // Frees tokenRefreshed$ for queued requests
        tap(() => this.tokenRefreshedSource.next()),
        catchError((error) => {
          throw error;
        })
      );
    }
  }

  handleLogout() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(AlertModalComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.componentInstance.message =
      'Sessão expirada. Por favor, logue novamente.';
    this.userService.logout();
  }
}
