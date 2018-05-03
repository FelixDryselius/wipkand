import { Component, OnInit, OnDestroy } from '@angular/core';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { CommentService } from '../../shared/application-services/comment.service';
import { QueryResponse } from '../../shared/interfaces/query-response'
import { TokenInterceptor } from '../../auth/token.interceptor'

//3rd party imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
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

  //Observables and subscriptions
  commentObservable: Observable<any>
  commentSub: any;

  private tokenRefreshRecallSub: any;
  private httpRecalls: any[] = [];

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
    if (this.tokenRefreshRecallSub) {
      this.tokenRefreshRecallSub.unsubscribe()
    }
  }

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentSub = this.commentService.getComment().retryWhen(error => {
      return error.mergeMap((error: any) => { 
        if (error.error.code == "token_not_valid") {
          return Observable.of(error.status).delay(500)
        }
        return Observable.throw({error: "No retry"})
      }).take(2)
    })
    .subscribe(data => {
      this.comments = (data as QueryResponse).results
    })
  }
}
