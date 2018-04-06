import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  title = "Comments in current batch";
  message:string;

  constructor(private data: CommentServiceService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    console.log("this.message "+this.message)
  }



}
