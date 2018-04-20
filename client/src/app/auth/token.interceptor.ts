
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let csrftoken = this.cookieService.get('csrftoken')
    console.log("INTERCEPTING!")
    let jwttoken = this.cookieService.get('jwttoken')
    console.log("Token is: " + jwttoken)
    //let jwttoken = ''
    if (jwttoken) {
      request = request.clone({
        setHeaders: {
          // This is where you can use your various tokens
          Authorization: `Bearer ${jwttoken}`,
          // 'X-CSRFToken': `${csrftoken}`
        }
      });
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log("cool it worked!")
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log("error occured")
        }
      }
    });
  }
}