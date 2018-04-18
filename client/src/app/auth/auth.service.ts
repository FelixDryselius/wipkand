import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';





@Injectable()
export class AuthAPIService {
   private baseUrl = 'http://127.0.0.1:8000/api/'
   

  constructor(
    private http: HttpClient,
    ){ }

    login(data:any): Observable<any>{
        let apiLoginEndpoint = `${this.baseUrl}auth/`;
        let httpOptions:{};
        return this.http.post(apiLoginEndpoint, data, httpOptions)
    }
}