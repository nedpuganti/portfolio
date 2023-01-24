import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    // console.log('intercepted request ... ');

    if (authToken !== null || authToken !== 'undefined') {
      // Clone the request to add the new header.
      request = request.clone({
        headers: request.headers.set('x-auth-token', `${authToken}`)
      });
      // console.log('Sending request with new header now ...');

      // send the newly created request
      return next.handle(request).pipe(
        catchError((error, _caught) => {
          //  intercept the response error and displace it to the console
          console.log('Error Occurred');

          if (error.status === 500) {
            this.toastr.error(error.message, error.status, {
              positionClass: 'toast-bottom-right'
            });
          }

          //  return the error to the method that called it
          return observableThrowError(error);
        }),
        tap((res: any) => {
          if (res?.body) {
            const responseObj: any = res?.body;
            console.log(responseObj);
          }
        })
      ) as any;
    }
  }
}
