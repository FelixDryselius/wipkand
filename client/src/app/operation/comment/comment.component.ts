import { Component, OnInit, OnDestroy} from '@angular/core';

// Application imports
import { CommentService } from './comment.service'; 


//3rd party imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  //Dynamic titles: 
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  mainTitle = "Comments"; 
  
  //Variables
  dateNow : Date = new Date(); // to display current date
  comments: JSON []; // list of comments from API
  newComment: Observable<any>; // for user added comments
  
  constructor( private commentService:CommentService) { } //import injectable service

  ngOnInit() {
    this.getComment()
  }
  
  ngOnDestroy() {
    this.commentService
  }

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentService.getComment().subscribe(data =>{
      this.comments = data as JSON []
    });
  }

}
