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
  



  constructor(private commentService:CommentService, private operationsService: OperationsService) { }

  ngOnInit() {
    // this.getProdStatLatestBatches
    // this.latestBatchNumbers = this.getBatchNumbers("?limit=5")
    // this.getProductionStatistics('?search=')
    

    // this.productionStatisticsSubscribe = this.statisticsService.getStatistics(batchNumber).subscribe(data => {
    //   this.productionStatistics = data  })
   for(let i=0; i<5; i++){
      let query = '?limit=1&offset=' + String(i)
      this.getProdStatLatestBatches(query).subscribe(data =>{
        console.log('init of getProdStatLatestBatches started..')
        this.productionStatistics = (data as QueryResponse).results as JSON []
        console.log(this.productionStatistics);
      });
   }



    this.comments = this.getComment()
  }
  nextBatch() {
    //this function will guid the user to the next page with the next batch. Waiting for backend to complete
  }
  getComment(batchNumber?:string) { //batchNumber will be used later
    // Subscribe to service and save the data in comments list as json obj
    let tempData
    this.commentService.getComment().subscribe(data =>{
      tempData = data as JSON []
    });
    return tempData
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
      tempData =  (data as QueryResponse).results as JSON
      let superTemp = tempData as Batch

      console.log('this is tempData: ' + superTemp.batch_number);
      return this.operationsService.getProductionStatistics('?search='+superTemp.batch_number) 
    })
     
          
     
 
  
  }

}



