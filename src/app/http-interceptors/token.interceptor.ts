import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Here I set the token for every request
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.token}`
      },
      withCredentials: true, // I need this to let the browser overwrite the token cookie
    });

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.auth.updateTokenFromHeaders(event);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // on 401, my token has expired, so I delete it
            this.auth.logout();
            // todo: redirect to homepage or welcome page
          }
        }
      })
    );
  }
}
