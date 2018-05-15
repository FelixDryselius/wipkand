import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

//3rd party and application imports:
import { CommentModule } from './comment/comment.module';
import { CurrentBatchInfoModule } from './current-batch-info/current-batch-info.module';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { HomeComponent } from './home/home.component';
import { OperationRoutingModule } from './operation-routing.module';
import { StartBatchComponent } from './start-batch/start-batch.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CommentModule,
    CurrentBatchInfoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    OperationRoutingModule    
  ],
  declarations: [
    FinishBatchComponent,
    HomeComponent,
    StartBatchComponent
   ],
  providers: [],
  exports: [CurrentBatchInfoModule]
})
export class OperationModule { }
