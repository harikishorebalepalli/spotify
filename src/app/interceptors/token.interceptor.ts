import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    let jwt_token = this._authService.getJWTToken();
    if (!request.url.includes('token') && jwt_token) {
      request = this.addToken(request, jwt_token);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleAuthenticationError(request, next);
        } else {
          return throwError(() => console.log(error));
        }
      })
    );
  }

  private handleAuthenticationError(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this._authService.getAccessToken().pipe(
      switchMap((res) => {
        localStorage.setItem('JWT_TOKEN', res.access_token);
        return next.handle(this.addToken(request, res.access_token));
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
