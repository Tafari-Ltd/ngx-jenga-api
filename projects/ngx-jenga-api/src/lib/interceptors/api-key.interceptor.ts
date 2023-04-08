import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JENGA_API_KEYS } from '../jenga.keys';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor(
    @Inject(JENGA_API_KEYS) private token: any
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'API-Key': `${this.token.api_key}`
      }
    });
  return next.handle(request);
  }
}
