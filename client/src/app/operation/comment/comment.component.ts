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

  //Variables
  dateNow: Date = new Date(); // to display current date
  comments: {}; // list of comments from API
  newComment: Observable<any>; // for user added comments

  constructor(
    private commentService: CommentService,
    private authAPI: AuthAPIService,
  ) { }

  ngOnInit() {
    this.getContent();
    this.tokenRefreshRecallSub = this.authAPI.tokenRefreshRecall.subscribe(refresh => {
      if (refresh) {
        this.getContent();
        this.authAPI.tokenRefreshRecall.next(false)
      }
    })
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe()
    if (this.tokenRefreshRecallSub) {
      this.tokenRefreshRecallSub.unsubscribe()
    }
  }

  getContent() {
    this.getComment()
  }

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentSub = this.commentService.getComment().subscribe(data => {
      this.comments = (data as QueryResponse).results
    },
      error => {
        console.log(error)
        // //this.comments = this.authAPI.setRecalledResponse()
        // console.log("JWT access token expired. Refreshing token...")
        // this.tokenRefreshHttpRecallSub = this.authAPI.tokenRefreshRecall.subscribe(data => {
        //   if (data != null) {
        //     this.comments = (data['body'] as QueryResponse).results
        //   }
        // })
      }
    )
  }
}
