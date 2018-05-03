import { Component, OnInit, OnDestroy } from '@angular/core';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { CommentService } from '../../shared/application-services/comment.service';
import { QueryResponse } from '../../shared/interfaces/query-response'
import { TokenInterceptor } from '../../auth/token.interceptor'

//3rd party imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retryWhen';



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

  //Observables and subscriptions
  commentObservable: Observable<any>
  commentSub: any;

  //Variables
  dateNow: Date = new Date(); // to display current date
  comments: {}; // list of comments from API
  newComment: Observable<any>; // for user added comments

  constructor(
    private commentService: CommentService,
    private authAPI: AuthAPIService,
  ) { }

  ngOnInit() {
    this.getComment()
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe()
  }

  getComment() {
    this.commentSub = this.commentService.getComment()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.comments = (data as QueryResponse).results
      })
  }
}
