
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
export class TokenInterceptor {  //implements HttpInterceptor 

  isRefreshingToken: boolean = false;
  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
          case 400:
            return this.handle400Error(error);
          case 401:
            return this.handle401Error(error, request, next);
          // case 403:
          //   return this.handle403Error(error);
          default:
            console.log("An error with status " + error.status + " occurred. Message: " + error.error['detail'])
        }
      }
    });
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'token_not_valid') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.authAPI.performLogout();
    }
    return Observable.throw(error);
  }

  handle401Error(error, request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // Making a new HTTP request to get a new JWT access token, using the refresh token/endpoint. 
      return this.authAPI.refreshToken().switchMap((newToken: string) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`,
          }
        })
        // Using the returned new access token to recall the original HTTP request that failed. 
        return next.handle(request).map((response: HttpEvent<any>) => {
          // Fetching the response of the cloned original HTTP request and pushing it into a shared observable.
          // The component that made the original HTTP request subscribes to this observable and receives the new HTTP response.
          if (response instanceof HttpResponse) {
            this.authAPI.tokenRefreshRecall.next(response)
          }
        })
      })
        .catch(error => {
          //Exception occured when trying to fetch new token.
          console.log("Exception occured when trying to fetch new token. Status: " + error.status)
          this.authAPI.performLogout()
          return next.handle(request)
        })
        .finally(() => {
          this.isRefreshingToken = false;
        }).subscribe();
    }
    else {
      //We should never end up here
      console.log("Unknown error. If this occured, investigate!")
      this.authAPI.performLogout()
      return next.handle(request)
    }
  }
}