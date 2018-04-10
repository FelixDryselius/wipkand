import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentsService {
  
  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/'; // hard coded URL for api to get all comments

  constructor(private http:HttpClient) { }

  // the method other apps subscribe to in order to get the api
  getComments() {
    return this.http.get(this.ROUTE_URL) //should add a catch error func here, like: import "rxjs/add/operator/catch";
  }

}
