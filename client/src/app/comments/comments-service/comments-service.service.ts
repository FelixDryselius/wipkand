import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentsServiceService {
  posts: any;
  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/';

  constructor(private http:HttpClient) { }

  getPosts() {
    this.posts = this.http.get(this.ROUTE_URL)
  }

}
