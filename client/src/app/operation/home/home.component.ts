import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { OperationsService } from '../../operations.service';
import { CommentService } from '../comment/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commentAdded = false;
  commentAddedNotification = 'Your comment was added!';

  // Variables for creating a new comment. 
  private commentDate: Date;
  private commentId: Number;
  private commentName: any;
  private commentText: any;
  private req_comment: any;

  // A list storing comments fetched from api
  comments: JSON [];
  
  //the following items are copied from start-batch.component
  private prodActive: boolean;
  private prodInfo: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  constructor(private operationsService: OperationsService, private commentService: CommentService, private http: HttpClient) { }

  ngOnInit() {
    this.getComment()
    //the following items are copied from start-batch.component. Subscribes to be able to connect comment to running batch
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
  }

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentService.getComment().subscribe(data =>{
      this.comments = data as JSON []
    });
    
  }

  submitComment(event, formData) {
    //TODO: Do we really need to store these values in the class? 
    
    this.commentName = formData.value['commentName'];
    this.commentText = formData.value['commentText'];
    this.commentDate = new Date();
    
    let newComment = {
      comment_id: this.comments.length, 
      user_name: this.commentName,
      post_date: this.commentDate,
      text_comment: this.commentText,
      batch_number: this.prodInfo.batch_number,
    }

    // Add new comment through commentService. Also get all comments in api to be able to count for incrementing id next comment
    this.req_comment = this.commentService.addComment(newComment).subscribe(data=>{this.getComment()});

    // Triggers notification
    this.commentAdded = true;

    // Resets form
    formData.resetForm()
  }

  submitFloorstock(event, formData) {
    //TODO: Do we really need to store these values in the class? 
    
    this.commentName = formData.value['commentName'];
    this.commentText = formData.value['commentText'];
    this.commentDate = new Date();
    
    let newComment = {
      comment_id: this.comments.length, 
      user_name: this.commentName,
      post_date: this.commentDate,
      text_comment: this.commentText,
      batch_number: this.prodInfo.batch_number,
    }

    // Add new comment through commentService. Also get all comments in api to be able to count for incrementing id next comment
    this.req_comment = this.commentService.addComment(newComment).subscribe(data=>{this.getComment()});

    // Resets form
    formData.resetForm()
  }  

}


