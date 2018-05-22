import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthLoginData } from './auth'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { QueryResponse } from '../shared/interfaces/query-response'

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/publish';
import { User } from '../shared/interfaces/user';

@Injectable()
export class AuthAPIService {
    //readonly baseUrl = 'http://127.0.0.1:8000/api/'
    readonly URL_AUTH = `http://127.0.0.1:8000/api/users/`

    private getUserRoleSub: any;
    private tokenRefreshHttpRecallSub: any;
    isRefreshingToken: boolean = false;

    currentUser: User;
    $currentUser: Observable<User>;

    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn)

    errorNotification: BehaviorSubject<string> = new BehaviorSubject(null);
    readonly errorNotification$: Observable<string> = this.errorNotification.asObservable().publish().refCount();

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) {
        if (this.tokenValid) {
            console.log("Token is valid!")
            this.setLoggedIn(true)
            if (!this.currentUser) {
                this.setCurrentUser()
            }
        } else {
            console.log("Token is not valid!")
            this.setLoggedIn(false)
            this.performLogout()
        }
    }

    getRole(): string {
        if (this.currentUser.isAdmin) {
            return "admin"
        } else if (this.currentUser.isOperator) {
            return "operator"
        } else if (this.currentUser.isSupervisor) {
            return "supervisor"
        }
    }

    setCurrentUser() {
        this.$currentUser = this.getUser()
            .switchMap(user => {
                if (user) {
                    this.currentUser = user as User
                    return Observable.of(this.currentUser)
                } else {
                    return Observable.of(null)
                }
            })
            .retryWhen(error => this.checkHttpRetry(error))
    }

    clearCurrentUser() {
        this.currentUser = null
        this.$currentUser = Observable.of(null)
    }

    getUser() {
        return this.http.get(`${this.URL_AUTH}role/`)
    }

    notifyError(message) {
        this.errorNotification.next(message);
        setTimeout(() => this.errorNotification.next(null), 10000);
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
        let apiLoginEndpoint = `${this.URL_AUTH}token/`;
        return this.http.post(apiLoginEndpoint, data);
    }

    performLogin(token) {
        this.cookieService.set('jwt-accesstoken', token['access'], null, "/")
        this.cookieService.set('jwt-refreshtoken', token['refresh'], token['expiry'], "/")
        this.cookieService.set('jwt-refresh-expires', token['expiry'], null, "/")
        this.setLoggedIn(true)
        this.setCurrentUser()
        this.router.navigate([""])
    }

    performLogout() {
        this.cookieService.delete('jwt-accesstoken', '/')
        this.cookieService.delete('jwt-refreshtoken', '/')
        this.cookieService.delete('jwt-refresh-expires', '/')
        this.setLoggedIn(false)
        this.clearCurrentUser()
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
        let refreshEndpoint = `${this.URL_AUTH}token/refresh/`;
        let refreshToken = this.cookieService.get("jwt-refreshtoken");
        return this.http.post(`${this.URL_AUTH}token/refresh/`, { "refresh": `${refreshToken}` }).map(token => {
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
            if (error.error) {
                if (error.error.code == "token_not_valid") {
                    return Observable.of(error.status).delay(500)
                }
            }
            return Observable.throw(error)
        }).take(2)
    }
    // .retryWhen(
    //   error => error.mergeMap((error: any) => error.error.code == "token_not_valid" ? Observable.of(error.status).delay(500) : Observable.throw({ error: "No retry" })).take(2))

}