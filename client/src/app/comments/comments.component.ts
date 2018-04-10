import { CommentsService } from './service/comments.service'; 
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  //Dynamic titles: 
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  mainTitle = "Comments"; 
  
  //Variables
  dateNow : Date = new Date(); // to display current date
  comments: JSON []; // list of comments from API
  newComments = []; // for user added comments
  
  constructor(private commentsService:CommentsService) { } //import injectable service

  ngOnInit() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentsService.getComments().subscribe(data =>{
      this.comments = data as JSON []
    });
  }
  
  ngOnDestroy() {
    this.commentsService
  }

  // Function to handle newly generated comments
  addComment(newComment = []) {
    console.log(Date)
    if (newComment) {
      this.newComments.push(newComment);
    }
  }
}
