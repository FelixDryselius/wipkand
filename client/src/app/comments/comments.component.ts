import { CommentsService } from './service/comments.service'; 
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../assets/interface/comment';
import { SortByPipe } from '../sort-by.pipe';


//3rd party imports
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

}
