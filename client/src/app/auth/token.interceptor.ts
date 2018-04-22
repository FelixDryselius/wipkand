
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
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let csrftoken = this.cookieService.get('csrftoken')
    //debugger;
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
        // do stuff with response if you want
        //console.log("cool it worked!")
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

        // if (error.status === 401 || error.status === 403) {
        //   debugger;
        //   if (error.error['code'] == "token_not_valid") {
        //     return this.authAPI.refreshToken().mergeMap(t => {
        //       request = request.clone({
        //         setHeaders: {
        //           // This is where you can use your various tokens
        //           Authorization: `Bearer ${t}`,
        //           // 'X-CSRFToken': `${csrftoken}`
        //         }
        //       })
        //       return next.handle(request);
        //     })
        //   }
        //   console.log("401 or 403 error occured!")
        //   // this.cookieService.delete('jwt-accesstoken', '/')
        //   // this.cookieService.delete('jwt-refreshtoken', '/')
        //   // alert("Session ended. Please login again")
        //   // this.router.navigate(['login/'])
        // }
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
    //debugger;
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // let test = this.authAPI.refreshToken().switchMap((newToken: string) => {
      //   //if (newToken) {
      //     debugger;
      //     console.log("In the return in the interceptor. Token is: " + newToken)
      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: `Bearer ${newToken}`,
      //       }
      //     })
      //     return next.handle(request);
      return this.authAPI.refreshToken().switchMap((newToken: string) => {
        //if (newToken) {
          //debugger;
          console.log("In the return in the interceptor. Token is: " + newToken)
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            }
          })
          return next.handle(request);
        //}
        //new token not received!
        // console.log("Tried to fetch new token but failed. New token response was: " + newToken)
        // return this.authAPI.performLogout()
      })
        .catch(error => {
          //Exception occured when trying to fetch new token.
          console.log("Exception occured when trying to fetch new token. Status: ")// error.status)
          return next.handle(request)
          //return this.authAPI.performLogout()
        })
        .finally(() => {
          this.isRefreshingToken = false;
        }).subscribe()
    }
    else {
      //We should never end up here
      
      //return  this.cookieService.get('jwt-accesstoken')
      console.log("Unknown error. If this occured, investigate!")
      console.log("Token is now: " + this.cookieService.get(""))
      this.authAPI.performLogout()
      return next.handle(request)
    }
  }
}