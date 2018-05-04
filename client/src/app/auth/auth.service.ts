import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthLoginData } from './auth'
import { User } from './user';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { QueryResponse } from '../shared/interfaces/query-response'

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthAPIService {
    private baseUrl = 'http://127.0.0.1:8000/api/'

    tokenRefreshHttpRecallSub: any;
    isRefreshingToken: boolean = false;

    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn)

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) {
        if (this.tokenValid) {
            console.log("Token is valid!")
            // TODO: Get user profile somehow..
            this.setLoggedIn(true)
        } else {
            console.log("Token is not valid!")
            this.setLoggedIn(false)
            this.performLogout()
        }
    }

    get tokenValid(): boolean {
        const expiresAt = new Date(this.cookieService.get('jwt-refresh-expires')) 
        return new Date() < expiresAt;
    }

    setLoggedIn(value: boolean) {
        this.loggedIn$.next(value);
        this.loggedIn = value;
      }

    login(data: AuthLoginData): Observable<any> {
        let apiLoginEndpoint = `${this.baseUrl}users/token/`;
        return this.http.post(apiLoginEndpoint, data);
    }

    performLogin(token) {
        this.cookieService.set('jwt-accesstoken', token['access'], null, "/")
        this.cookieService.set('jwt-refreshtoken', token['refresh'], token['expiry'], "/")
        this.cookieService.set('jwt-refresh-expires', token['expiry'], null, "/")
        this.setLoggedIn(true)
        this.router.navigate(["/"])
    }

    performLogout() {
        this.cookieService.delete('jwt-accesstoken', '/')
        this.cookieService.delete('jwt-refreshtoken', '/')
        this.cookieService.delete('jwt-refresh-expires', '/')
        this.setLoggedIn(false)
        this.router.navigate(['login/'])
    }

    callRefreshToken() {
        this.tokenRefreshHttpRecallSub = this.refreshToken().subscribe(() => {
            console.log("Token Refreshed. Unsubscribing..");
            this.isRefreshingToken = false;
            this.tokenRefreshHttpRecallSub.unsubscribe()
        })
    }

    refreshToken(): Observable<any> {
        let refreshEndpoint = `${this.baseUrl}users/token/refresh/`;
        let refreshToken = this.cookieService.get("jwt-refreshtoken");
        return this.http.post(`${this.baseUrl}users/token/refresh/`, { "refresh": `${refreshToken}` }).map(token => {
            console.log("In refreshToken(). response is: ")
            console.log(token);
            this.cookieService.set('jwt-accesstoken', token['access'], null, "/")
            this.cookieService.set('jwt-refreshtoken', token['refresh'], new Date(token['expires']), "/")
        })
    }

    // Check if any returned error from a http call is caused by an expired token.
    // If that is the case, retry the request. Otherwise throw a regular error
    checkHttpRetry(error) {
        return error.mergeMap((error: any) => {
            if (error.error.code == "token_not_valid") {
                return Observable.of(error.status).delay(500)
            }
            return Observable.throw({ error: "No retry" })
        }).take(2)
    }
    // .retryWhen(
    //   error => error.mergeMap((error: any) => error.error.code == "token_not_valid" ? Observable.of(error.status).delay(500) : Observable.throw({ error: "No retry" })).take(2))

}