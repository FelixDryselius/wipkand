import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CommentService } from '../comment/comment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private commentDate: Date;
  private commentId: Number;
  private commentName: any;
  private commentText: any;
  private req_comment: any;
  private commentInfo: {};
  comments: JSON [];

  constructor(private commentService: CommentService, private http: HttpClient) { }

  ngOnInit() {

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
    this.getComment()
    console.log(this.comments)

    let newComment = {
      comment_id: 77, 
      user_name: this.commentName,
      post_date: this.commentDate,
      text_comment: this.commentText,
      batch_number: "223",
    }

    this.req_comment = this.commentService.addComment(newComment).subscribe();
    this.commentInfo = {
    }
  }


}


