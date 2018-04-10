import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../../assets/interfaces/comment'
import { Observable } from 'rxjs/Observable'

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class CommentsService {
  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/';

  constructor(private http:HttpClient) { }

  getComments() {
    return this.http.get(this.ROUTE_URL) //should add a catch error func here
  }

}
