import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommentsServiceService } from './comments-service/comments-service.service'; 
import { HttpClient } from '@angular/common/http';

import { Comment } from '../../assets/interfaces/comment';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  mainTitle = "Comments";
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  newComments = [];
  comments: JSON [];
  dateNow : Date = new Date();

  readonly ROUTE_URL = 'http://localhost:8000/api/operations/comment/';

  constructor(private http:HttpClient, private commentsService:CommentsServiceService) { }

  getComments() {
        
  }
  
  ngOnInit() {
    this.commentsService.getComments().subscribe(data =>{
      this.comments = data as JSON []
    });
    console.log(this.comments);
    console.log('test');
  }
  
  ngOnDestroy(): void {
    this.commentsService
  }

   addComment(newComment = []) {
   console.log(Date)
     if (newComment) {
       this.newComments.push(newComment);
   }
 }
}
