import { Component, OnInit,} from '@angular/core';
import { CommentServiceService } from '../comment-service/comment-service.service';
import { HttpClient } from '@angular/common/http';


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
  commentData: any [];

  readonly ROOT_URL = 'http://localhost:8000/api/operations/comment/'

  constructor(private data: CommentServiceService, private http: HttpClient) {
    
   }

  ngOnInit() {
    this.http.get(this.ROOT_URL).subscribe(
      data => {
        this.commentData = data as any [];		// FILL THE ARRAY WITH DATA.
      },

    );
   
  }
addComment(newComment = []) {
  console.log(Date)
    if (newComment) {
      this.comments.push(newComment);
    }
  }
}
