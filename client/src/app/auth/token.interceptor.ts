
import { Injectable, Type } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthAPIService } from './auth.service';

import 'rxjs/add/operator/do';
//import { Observable } from 'rxjs/Rx'
import { CookieService } from 'ngx-cookie-service';
import { flatMap } from 'rxjs/operators';

//import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';


@Injectable()
export class TokenInterceptor {//implements HttpInterceptor {

  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setToken(request)
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
          case 400:
            return this.handle400Error(error);
          case 401:
            return this.handle401Error(error);
          case 403:
            return this.handle403Error(error);
          default:
            this.authAPI.notifyError(error)
            console.log("An error with status " + error.status + " occurred. Message: " + error.error['detail'])
            return Observable.throw(error)
        }
      }
    });
  }

  setToken(request) {
    let jwttoken = this.cookieService.get('jwt-accesstoken')
    if (jwttoken) {
      request = request.clone({
        setHeaders: {
          // This is where you can use your various tokens
          Authorization: `Bearer ${jwttoken}`,
          'Content-type': 'application/json',
          // 'X-CSRFToken': `${csrftoken}`
        }
      });
    }
    return request
  }

  handle403Error(error) {
    this.authAPI.notifyError(error)
    return Observable.throw(error);
  }

  handle400Error(error) {
    this.authAPI.notifyError(error)
    if (error && error.status === 400 && error.error && error.error.code === 'token_not_valid') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.authAPI.performLogout();
    }
    return Observable.throw(error);
  }

  handle401Error(error) {
    if (error.error.code == "token_not_valid") {
      if (!this.authAPI.isRefreshingToken) {
        this.authAPI.isRefreshingToken = true;
        this.authAPI.callRefreshToken()
        return
      }
    } else {
      this.authAPI.notifyError(error)
      console.log("Authorization denied. Logging out...");
      this.authAPI.performLogout()
      return
    }
  }
}
