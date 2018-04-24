import { Component, OnInit } from '@angular/core';

// 3rd party and application imports
import { Batch } from '../../shared/interfaces/batch';
import { CommentService } from '../../shared/application-services/comment.service';
import { map } from 'rxjs/operators';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { debug } from 'util';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  productionStatisticsSubscribe: any; 
  productionStatistics: any;
  comments:any;
  latestBatchNumbers: any[];
  
  constructor(private commentService:CommentService, private operationsService: OperationsService) { }

  ngOnInit() {
    this.latestBatchNumbers = this.getBatchNumbers("?limit=5")
    
    

    // this.productionStatisticsSubscribe = this.statisticsService.getStatistics(batchNumber).subscribe(data => {
    //   this.productionStatistics = data

    this.productionStatisticsSubscribe = this.operationsService.getProductionStatistics().subscribe(data => {
      this.productionStatistics = data
    })
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
  getProductionStatistics(query?:string) { 
    let tempData
    this.operationsService.getProductionStatistics(query).subscribe(data =>{
      tempData = data
      console.log(data);
      
    })
    console.log("this is tempdata: "+tempData);
    return tempData
  }
  getBatchNumbers(query?:string) { 
    let tempData
    let batchNumberList = []
    this.operationsService.getBatchDetail(query).subscribe(data =>{
     tempData = data as Batch
      for( let item of tempData){
        batchNumberList.push(item.batch_number)
      }      
    })  
    return batchNumberList
  }
}