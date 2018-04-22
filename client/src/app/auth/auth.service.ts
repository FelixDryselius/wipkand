import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthLoginData } from './auth'
import { User } from './user';

@Injectable()
export class AuthAPIService {
    private baseUrl = 'http://127.0.0.1:8000/api/'
    test: string;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) { }

    createHeaders(token?: string) {
        let data = {
            "Content-type": 'application/json'
        }
        if (token) {
            data["Authorization"] = `Bearer ${token}`
        }
        let httpOptions = {
            headers: new HttpHeaders(data)
        }
        return httpOptions
    }

    login(data: AuthLoginData): Observable<any> {
        let apiLoginEndpoint = `${this.baseUrl}users/token/`;
        return this.http.post(apiLoginEndpoint, data);
    }

    performLogin(token) {
        this.cookieService.set('jwt-accesstoken', token['accessToken'], null, "/")
        this.cookieService.set('jwt-refreshtoken', token['refreshToken'], token['expiry'], "/")
        this.router.navigate(["/"])
    }

    performLogout() {
        this.cookieService.delete('jwt-accesstoken', '/')
        this.cookieService.delete('jwt-refreshtoken', '/')
        this.router.navigate(['login/'])
    }

    refreshToken(): Observable<string> {
        //debugger;
        let refreshEndpoint = `${this.baseUrl}users/token/refresh/`;
        let refreshToken = this.cookieService.get("jwt-refreshtoken");
        //this.cookieService.delete('jwt-accesstoken', '/');
        return this.http.post(refreshEndpoint, {"refresh": `${refreshToken}`}).map(response => {
            //debugger;
            console.log("In refreshToken(). response is: " + response)
            let token = response as User
            let accessToken = token.access;
            this.cookieService.set('jwt-accesstoken', accessToken, null, "/")
            return accessToken
        })

        // let testToken = "TEST TOKEN!"
        // return Observable.of(testToken);

        // debugger;
        // let refreshEndpoint = `${this.baseUrl}users/token/refresh`;
        // let refreshToken = this.cookieService.get("jwt-refreshtoken");
        // return this.http.post(refreshEndpoint, refreshToken, {observe: 'response'}).map(response => {
        //     debugger;
        //     let token = response as User
        //     let accessToken = token.access;
        //     this.cookieService.set('jwt-accesstoken', accessToken, null, "/")
        //     return accessToken
        // })
    }
}