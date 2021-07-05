import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { UserService } from '../services/user.service';
import { CalendarService } from '../services/calendar.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private userService: UserService,
      private calendarService: CalendarService,
      private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloneRequest: HttpRequest<any>;
        if (request.url.indexOf('localhost:3000') !== -1) {
          cloneRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.userService.token}`)
          });
          return next.handle(cloneRequest);
        }
        cloneRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.calendarService.getToken()}`)
        });
        return next.handle(cloneRequest)
          .pipe(
            catchError((error: any) => {
              if (error.status === 401) {
                this.router.navigate(['login']);
                this.userService.clearStorage();
                return throwError(error);
              }
            })
          );
    }

}
