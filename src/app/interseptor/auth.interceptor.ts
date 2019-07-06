import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { CalendarService } from '../services/calendar.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private userService: UserService,
      private calendarService: CalendarService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('localhost:3000') !== -1) {
          const cloneRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.userService.token}`)
          });
          return next.handle(cloneRequest);
        }
        const cloneRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${this.calendarService.getToken()}`)
        });
        return next.handle(cloneRequest);
    }

}
