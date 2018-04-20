import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthLoginData } from './auth'

@Injectable()
export class AuthAPIService {
    private baseUrl = 'http://127.0.0.1:8000/api/'


    constructor(
        private http: HttpClient,
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
        //let token = "..."
        let apiLoginEndpoint = `${this.baseUrl}users/token/`;
        let httpOptions = this.createHeaders();
        debugger;
        return this.http.post(apiLoginEndpoint, data) // , httpOptions
    }
}