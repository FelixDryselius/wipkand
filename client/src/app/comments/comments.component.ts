import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  mainTitle = "Comments";
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  message:string;

  constructor(private data: CommentServiceService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newCommentText(commentText) {
    console.log(commentText.value)
    this.data.changeMessage(commentText.value)
  }


}
