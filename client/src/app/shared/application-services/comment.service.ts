import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

// 3rd party imports:
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommentService {

  readonly URL_ROOT = 'http://localhost:8000/'; // hard coded URL for api to get all comments
  readonly URL_COMMENT = 'api/operations/comment/';

  constructor(private http: HttpClient) { }

  // the method other apps subscribe to in order to get the api
  getComment(query?: string) {
    if (query) {
      return this.http.get(this.URL_ROOT + this.URL_COMMENT + query)
    } else {
      return this.http.get(this.URL_ROOT + this.URL_COMMENT)
    }
     //should add a catch error func here, like: import "rxjs/add/operator/catch";
  }

  addComment(data) {
    return this.http.post(this.URL_ROOT + this.URL_COMMENT, data)
  }
}
