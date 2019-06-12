import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
      private userService: UserService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.userService.token}`)
        });
        return next.handle(cloneRequest);
    }

}
