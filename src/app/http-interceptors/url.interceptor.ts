import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ENGINE_BASE_URL = environment.engineBaseUrl;

    request = request.clone({
      url: ENGINE_BASE_URL + request.url
    });

    return next.handle(request);
  }
}
