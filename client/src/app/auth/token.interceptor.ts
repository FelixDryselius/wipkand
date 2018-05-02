
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

  requestQueue: any[] = []
  isRefreshingToken: boolean = false;

  constructor(
    private authAPI: AuthAPIService,
    private cookieService: CookieService,
    private router: Router,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let jwttoken = this.cookieService.get('jwt-accesstoken')
    // if (jwttoken) {
    //   request = request.clone({
    //     setHeaders: {
    //       // This is where you can use your various tokens
    //       Authorization: `Bearer ${jwttoken}`,
    //       'Content-type': 'application/json',
    //       // 'X-CSRFToken': `${csrftoken}`
    //     }
    //   });
    // }
    request = this.setToken(request)
    debugger;
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        debugger;
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

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'token_not_valid') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.authAPI.performLogout();
    }
    return Observable.throw(error);
  }

  handle401Error(error, request: HttpRequest<any>, next: HttpHandler) {
    if (error.error.code == "token_not_valid" && !this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Making a new HTTP request to get a new JWT access token, using the refresh token/endpoint.
      if (request.method == "GET") { 
        return this.authAPI.refreshToken().subscribe(success => {
          console.log("http method: GET");
          this.isRefreshingToken = false;
          this.authAPI.tokenRefreshRecall.next(true)
          // tokenRefreshSub.unsubscribe()
          return
        })
      } else {
        return this.authAPI.refreshToken().switchMap(success => {
          console.log("http method: OTHER");
          console.log("Request is: ");
          console.log(request);
          request = this.setToken(request)
          this.isRefreshingToken = false;   
          return next.handle(request)
        }).subscribe()
      }
    }
  }
}

//       .switchMap((newToken: string) => {
//   // request = request.clone({
//   //   setHeaders: {
//   //     Authorization: `Bearer ${newToken}`,
//   //   }
//   // })

//   // Using the returned new access token to recall the original HTTP request that failed.
//   // for (let _request in this.requestQueue as [HttpRequest<any>]) {
//   //   _request = _request.clone({
//   //     setHeaders: {
//   //       Authorization: `Bearer ${newToken}`,
//   //     }
//   //   })

//   // }
//   console.log("Iterating request to be made. length:" + this.requestQueue.length);
//   for (let i = 0; i < this.requestQueue.length; i++) {
//     console.log("In the request queue! Current request: ")
//     console.log(this.requestQueue[i]);

//     let _req = this.requestQueue[i].clone({
//       setHeaders: {
//         Authorization: `Bearer ${newToken}`,
//       }
//     })
//     //this.requestQueue[i] 
//     debugger;
//     next.handle(_req).map((response) => {
//       // Fetching the response of the cloned original HTTP request and pushing it into a shared observable.
//       // The component that made the original HTTP request subscribes to this observable and receives the new HTTP response.
//       console.log("In the response queue! Current response: ")
//       console.log(response);
//       if (response instanceof HttpResponse) {
//         // console.log("In the response queue! Current response: ")
//         // console.log(response);
//         this.authAPI.tokenRefreshRecall.next(response)
//       }
//     })
//   }
//   request = request.clone({
//     setHeaders: {
//       Authorization: `Bearer ${newToken}`,
//     }
//   })
//   return next.handle(request)
//   // return next.handle(request).map((response: HttpEvent<any>) => {
//   //   // Fetching the response of the cloned original HTTP request and pushing it into a shared observable.
//   //   // The component that made the original HTTP request subscribes to this observable and receives the new HTTP response.
//   //   if (response instanceof HttpResponse) {
//   //     this.authAPI.tokenRefreshRecall.next(response)
//   //   }
//   // })
// })
//         .catch (error => {
//   //Exception occured when trying to fetch new token.
//   console.log("Exception occured when trying to fetch new token. Status: " + error.status)
//   this.isRefreshingToken = false;
//   this.authAPI.performLogout()
//   return next.handle(request)
// })
//         .finally(() => {
//   console.log("Finally trigger");
//   this.isRefreshingToken = false;
//   //return next.handle(request)
//   // for (let i = 0; i < this.requestQueue.length; i++) {
//   //   console.log("In the request queue! Current request: ")
//   //   console.log(this.requestQueue[i]);

//   //   next.handle(this.requestQueue[i]).map((response) => {
//   //       // Fetching the response of the cloned original HTTP request and pushing it into a shared observable.
//   //       // The component that made the original HTTP request subscribes to this observable and receives the new HTTP response.
//   //       console.log("In the response queue! Current response: ")
//   //         console.log(response);
//   //       if (response instanceof HttpResponse) {
//   //         // console.log("In the response queue! Current response: ")
//   //         // console.log(response);
//   //         this.authAPI.tokenRefreshRecall.next(response)
//   //       }
//   //     })
//   // }
// }).subscribe();
//     }
//     else {
//   console.log("If this happened, several HTTP calls have been made and failed! Req is now: ")
//   console.log(request);
//   console.log("Pushing it into request Queue.");
//   this.requestQueue.push(request)
//   console.log("length:" + this.requestQueue.length);
//   //this.isRefreshingToken = false;
//   //this.authAPI.performLogout()
//   // return next.handle(request).map((response: HttpEvent<any>) => {
//   //   // Fetching the response of the cloned original HTTP request and pushing it into a shared observable.
//   //   // The component that made the original HTTP request subscribes to this observable and receives the new HTTP response.
//   //   if (response instanceof HttpResponse) {
//   //     this.authAPI.tokenRefreshRecall.next(response)
//   //   }
//   // })
// }

