import { Component, OnInit } from '@angular/core';

// 3rd party and application imports
import { Batch } from '../../shared/interfaces/batch';
import { CommentService } from '../../shared/application-services/comment.service';
import { map } from 'rxjs/operators';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { debug } from 'util';
import { QueryResponse } from '../../shared/interfaces/query-response';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  productionStatisticsSubscribe: any; 
  productionStatistics = [];
  comments:any;
  latestBatchNumbers: any[];

  numberOfBatchesBack;
  



  constructor(private commentService:CommentService, private operationsService: OperationsService) { }

  ngOnInit() {
    this.numberOfBatchesBack = '1';
    // this.getProdStatLatestBatches
    // this.latestBatchNumbers = this.getBatchNumbers("?limit=5")
    // this.getProductionStatistics('?search=')
    

    // this.productionStatisticsSubscribe = this.statisticsService.getStatistics(batchNumber).subscribe(data => {
    //   this.productionStatistics = data  })

      let query = '?limit=1&offset=' + this.numberOfBatchesBack
      this.getProdStatLatestBatches(query).subscribe(data =>{
        console.log('init of getProdStatLatestBatches started..')
        this.productionStatistics = (data as QueryResponse).results as JSON []
        console.log(this.productionStatistics);
      });


  }
  nextBatch() {
    //this function will guid the user to the next page with the next batch. Waiting for backend to complete
  }
    
  
  // getProductionStatistics(query?:string) { 
  //   let tempData
  //   this.operationsService.getProductionStatistics(query).subscribe(data =>{
  //     this.productionStatistics = (data as QueryResponse).results as JSON []
      
  //   })
  //   console.log("this is tempdata: "+tempData);
  //   return tempData
  // }
  // getBatchNumbers(query?:string) { 
  //   let tempData
  //   let batchNumberList = []
  //   this.operationsService.getBatchDetail(query).subscribe(data =>{
  //     tempData =  (data as QueryResponse).results as JSON []
  //     tempData = data as Batch
  //     for( let item of tempData){
  //       batchNumberList.push(item.batch_number)
  //     }      
  //   })  
  //   return batchNumberList
  // }


  // public getProdStatLatestBatches(query?:String){ 
  //   let tempData
  //   let batchNumberList = []
  //   console.log('getProdStatLatestBatches started');
    
  //   return this.operationsService.getBatchDetail(query).switchMap(data =>{
  //     tempData =  (data as QueryResponse).results as JSON []
  //     let superTemp = tempData as Batch []
  //     console.log('this is superTemp: ' + superTemp.pop().batch_number);
  //     let test = superTemp.pop().batch_number
  //     return this.operationsService.getProductionStatistics('?search='+test) 
  //   })
     
          

  public getProdStatLatestBatches(query?:String){ 
    let tempData
    console.log('getProdStatLatestBatches started');
    return this.operationsService.getBatchDetail(query).switchMap(data =>{
      tempData =  (data as QueryResponse).results as JSON []
      let superTemp = tempData.pop() as Batch

      console.log('this is tempData: ' + superTemp.batch_number);
//      this.comments = this.getComment(superTemp.batch_number);
      return this.operationsService.getProductionStatistics('?search='+superTemp.batch_number) 
    })
     
          
     
 
  
  }

}



