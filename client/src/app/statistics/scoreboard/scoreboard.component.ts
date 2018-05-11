import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 3rd party and application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { CommentService } from '../../shared/application-services/comment.service';
import { map } from 'rxjs/operators';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Logs } from 'selenium-webdriver';



@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  productionStatisticsSubscribe: any; 
  productionStatistics = [];
  comments=[];
  latestBatchNumbers: any[];
  numberOfBatchesBack;
  currentBatch: Batch;

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
      this.getProdStatLatestBatches(query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data =>{
        this.productionStatistics = (data as QueryResponse).results as JSON []
      });
    }
  }
  
  
  
  nextBatch() {
    this.router.navigate(['../', Number(this.numberOfBatchesBack)+1], {relativeTo: this.route});
  }
  beforeBatch() {
    this.router.navigate(['../', Number(this.numberOfBatchesBack)-1], {relativeTo: this.route});
  }
          
  getBatchComments(query?:string) {
   this.commentService.getComment(query)
   .retryWhen(error => this.authAPI.checkHttpRetry(error))
   .subscribe(data =>{
      console.log((data as QueryResponse).results as JSON []  );
      this.comments = (data as QueryResponse).results as JSON []   
      
    })
  }

  public getProdStatLatestBatches(query?:string){ 
    let tempData
    return this.operationsService.getBatchDetail(query).switchMap(data =>{
      tempData =  (data as QueryResponse).results as JSON []

      this.currentBatch = tempData.pop() as Batch
      this.getBatchComments('?batch_number=' + this.currentBatch.batch_number)
      return this.operationsService.getProductionStatistics('?batch_number=' + this.currentBatch.batch_number) 
    })
     
          
     
 
  
  }

}



