import { CommentsService } from './service/comments.service'; 
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from './comment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


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
  newComment: Observable<any>; // for user added comments
  
  constructor(private commentsService:CommentsService) { } //import injectable service

  ngOnInit() {
    this.getComments()
  }
  
  ngOnDestroy() {
    this.commentsService
  }

  getComments() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentsService.getComments().subscribe(data =>{
      this.comments = data as JSON []
    });
  }

  // Function to handle newly generated comments
  createComment(formText, formName) {
    // The comment data to be posted. Temporary solution to comment id
    console.log(typeof formText)
    console.log(typeof formName)
    let commentData = {
      comment_id: this.comments.length,
      user_name: formName,
      post_date: new Date(),
      text_comment: formText,
      batch_number: '1000000001'
    }
    // Converts to JSON
    let newData = JSON.stringify(commentData)

    // Runs service and subsrcibes to data. Puts data in observable
    this.commentsService.addComment(newData).subscribe(data =>{
      this.newComment = data as Observable<any>
      
      // Gets updated comment list from api
      this.getComments()
  });
 
}
}
