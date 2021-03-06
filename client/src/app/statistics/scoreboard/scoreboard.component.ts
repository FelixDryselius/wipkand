import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

// 3rd party and application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { CommentService } from '../../shared/application-services/comment.service';
import { map } from 'rxjs/operators';
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Logs } from 'selenium-webdriver';



@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  //Subscribers
  productionStatisticsSubscriber: Subscription;
  commentSubscriber:Subscription;

  productionStatistics = [];
  comments=[];
  latestBatchNumbers: any[];
  numberOfBatchesBack;
  maxNumberOfBatches:number;
  currentBatch: Batch;

  // Can move back or not
  canMoveNextBatch:boolean;
  canMoveBeforeBatch:boolean;

  constructor(
    private authAPI: AuthAPIService,
    private commentService:CommentService, 
    private operationsService: OperationsService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.route.params.subscribe(val=>{
        this.numberOfBatchesBack = val.batchesBack;
        this.ngOnInit()     
      })
    }

    
  ngOnInit() { 
   
    if (isNaN(parseInt(this.numberOfBatchesBack))){
      this.router.navigate(['0'], {relativeTo: this.route});
    } 
    else {
      let query = '?limit=1&offset=' + String(this.numberOfBatchesBack)
      this.productionStatisticsSubscriber =  this.getProdStatLatestBatches(query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data =>{
        this.productionStatistics = (data as QueryResponse).results as JSON []
        // check if should disable buttons or not
        if (this.numberOfBatchesBack < (this.maxNumberOfBatches -1 ) ) {
          this.canMoveNextBatch = true
        } else {
          this.canMoveNextBatch = false
        }
        if (this.numberOfBatchesBack > 0) {
          this.canMoveBeforeBatch = true
        } else {
          this.canMoveBeforeBatch = false
        }
        
      });
    }  
  }

  ngOnDestroy(){
    if(this.productionStatisticsSubscriber){
      this.productionStatisticsSubscriber.unsubscribe()
    }
    if(this.commentSubscriber){
      this.commentSubscriber.unsubscribe()
     }
  }
  
  nextBatch() {
    if (this.canMoveNextBatch) {
      this.router.navigate(['../', Number(this.numberOfBatchesBack) + 1], { relativeTo: this.route });
    }
  }
  beforeBatch() {
    if (this.canMoveBeforeBatch) {
      this.router.navigate(['../', Number(this.numberOfBatchesBack) - 1], { relativeTo: this.route });
    }
  }
          
  getBatchComments(query?:string) {
    this.commentSubscriber = this.commentService.getComment(query)
   .retryWhen(error => this.authAPI.checkHttpRetry(error))
   .subscribe(data =>{
      this.comments = (data as QueryResponse).results as JSON []      
    })
  }

  public getProdStatLatestBatches(query?:string){ 
    let tempData
    return this.operationsService.getBatch(query).switchMap(data =>{
      tempData =  (data as QueryResponse).results as JSON []
      this.maxNumberOfBatches = (data as QueryResponse).count

      this.currentBatch = tempData.pop() as Batch
      this.getBatchComments('?batch_number=' + this.currentBatch.batch_number)
      return this.operationsService.getProductionStatistics('?batch_number=' + this.currentBatch.batch_number) 
    })
     
          
     
 
  
  }

}



