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

@Injectable()
export class AuthAPIService {
    private baseUrl = 'http://127.0.0.1:8000/api/'

    tokenRefreshHttpRecallSub: any;


    isRefreshingToken: boolean = false;
    
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) { }

    login(data: AuthLoginData): Observable<any> {
        let apiLoginEndpoint = `${this.baseUrl}users/token/`;
        return this.http.post(apiLoginEndpoint, data);
    }

    performLogin(token) {
        this.cookieService.set('jwt-accesstoken', token['access'], null, "/")
        this.cookieService.set('jwt-refreshtoken', token['refresh'], token['expiry'], "/")
        this.router.navigate(["/"])
    }

    performLogout() {
        this.cookieService.delete('jwt-accesstoken', '/')
        this.cookieService.delete('jwt-refreshtoken', '/')
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
}