import { Component, OnInit,} from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  mainTitle = "Comments";
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  comments = [];
  dateNow : Date = new Date();
  posts: any;

  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/';

  constructor(private data: CommentServiceService, private http:HttpClient) { }

  getPosts() {
    this.posts = this.http.get(this.ROUTE_URL)
  }
  
  ngOnInit() {
   
  }
  
  addComment(newComment = []) {
  console.log(Date)
    if (newComment) {
      this.comments.push(newComment);
    }
  }
}
