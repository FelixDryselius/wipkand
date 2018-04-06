import { Component, OnInit, Input } from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  title = "Add comment";
  message:string;

  constructor(private data: CommentServiceService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newMessage(commentText) {
    this.data.changeMessage(commentText.value)
  }

}
