import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { CommentComponent } from './comment.component';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentService } from './comment.service';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { SortByPipe } from '../../sort-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule    
  ],
  declarations: [
    CommentComponent
  ],
  providers: [CommentService, SortByPipe]
})
export class CommentModule { }
