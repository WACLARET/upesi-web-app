import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { DataService } from './data.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: DataService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.loggedInUser()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.loadToken()}`
        }
      });
    }
      return next.handle(request)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        });
  }
}
