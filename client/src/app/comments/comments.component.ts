import { Component, OnInit,} from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  mainTitle = "Comments";
  addCommentTitle = "Add comment";
  commentListTitle = "Comments list";
  comments = [];
  dateNow : Date = new Date();

  constructor(private data: CommentServiceService) {
    
   }

  ngOnInit() {
   
  }
addComment(newComment = []) {
  console.log(Date)
    if (newComment) {
      this.comments.push(newComment);
    }
  }
}
