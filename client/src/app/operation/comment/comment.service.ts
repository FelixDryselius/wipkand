import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

// 3rd party imports:
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeWhile';


@Injectable()
export class CommentService {

  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/'; // hard coded URL for api to get all comments

  constructor(private http: HttpClient) { }

  // the method other apps subscribe to in order to get the api
  getComment() {
    return this.http.get(this.ROUTE_URL)
  }

  addComment(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(this.ROUTE_URL, JSON.stringify(data), httpOptions)
  }

}
