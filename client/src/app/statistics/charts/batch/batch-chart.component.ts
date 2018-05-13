import { Component, OnInit } from '@angular/core';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { Batch } from '../../../shared/interfaces/batch';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../operation/shared/services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';

@Component({
  selector: 'app-batch-chart',
  templateUrl: './batch-chart.component.html',
  styleUrls: ['./batch-chart.component.css']
})
export class BatchChartComponent implements OnInit {
  // variables
  showAllDataButton = false



  //data
  haveData=false;
  displayData;
  batchData = [];

  //Chart here we set options fot the chart
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Date";
  xAxis=true;
  yAxis=true;
  timeline=true;



  constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }

  ngOnInit() {
    this.getBatchData()           
  }

  //Might be used later
  pressed(event) {
    let serieName;
    if(typeof event == 'string'){
      serieName = event
    } else {
      serieName = event.series
    }
    this.changeDisplayData(serieName)
    this.showAllDataButton = true
  }

  showAllData(){
    this.displayData = this.batchData
    this.showAllDataButton = false
  }

  changeTimeSpan(query?:string){
    let tempQuery = '?limit='+ query;
    this.getBatchData(tempQuery)
  }
  
  changeDisplayData(serieName:string){
    this.displayData.forEach(dataSerie =>{
      if(dataSerie.name == serieName){
       this.displayData = [
          dataSerie
        ]
      }
    })
  }

  getBatchData(query = '?limit=10')  {

    this.operationsService.getBatchDetail(query)
    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{

      let batchStatistics = (data as QueryResponse).results as Batch []           

      let relevantBatchesId = []
      let batchDataPoints = []
      let scrapArrayHolder = []
      let productionYieldArrayHolder = []
      let hmi1GoodArrayHolder = []
      let hmi1BadArrayHolder = []
      let hmi1TotalArrayHolder = []
      let hmi2GoodArrayHolder = []
      let hmi2BadArrayHolder = []
      let hmi2TotalArrayHolder = []
      let appliedLabelsArrayHolder = []

      batchStatistics.forEach(batch =>{
        scrapArrayHolder.push(
          {
            "value": batch.scrap,
            "name": batch.batch_number
          });

          productionYieldArrayHolder.push(
            {
              "value": batch.production_yield,
              "name": batch.batch_number
            });

          hmi1GoodArrayHolder.push(
            {
              "value": batch.hmi1_good,
              "name": batch.batch_number
            });

          hmi1BadArrayHolder.push(
            {
              "value": batch.hmi1_bad,
              "name": batch.batch_number
            }
          )
          hmi1TotalArrayHolder.push(
            {
              "value": batch.hmi1_good-batch.hmi1_bad,
              "name": batch.batch_number
            }
          )
          hmi2GoodArrayHolder.push(
            {
              "value": batch.hmi2_good,
              "name": batch.batch_number
            }
          )
          hmi2BadArrayHolder.push(
            {
              "value": batch.hmi2_bad,
              "name": batch.batch_number
            }
          )
          hmi2TotalArrayHolder.push(
            {
              "value": batch.hmi2_good-batch.hmi2_bad,
              "name": batch.batch_number
            }
          )
          appliedLabelsArrayHolder.push(
            {
              "value": batch.applied_labels,
              "name": batch.batch_number
            }
          )
        
        batchDataPoints = 
        [
          {
            "name": "Scrap",
            "series":scrapArrayHolder
          },
          {
            "name": "Yield",
            "series": productionYieldArrayHolder
          },
          {
            "name": "HMI1 Good",
            "series": hmi1GoodArrayHolder
          },
          {
            "name": "HMI1 Bad",
            "series": hmi1BadArrayHolder
          },
          {
            "name": "HMI1 Total",
            "series": hmi1TotalArrayHolder
          },
          {
            "name": "HMI2 Good",
            "series": hmi2GoodArrayHolder
          },
          {
            "name": "HMI2 Bad",
            "series": hmi2BadArrayHolder
          },
          {
            "name": "HMI2 Total",
            "series": hmi2TotalArrayHolder
          },
          {
            "name": "Applied Labels",
            "series": appliedLabelsArrayHolder
          }
        ]        
      })
    this.batchData = batchDataPoints
    this.displayData = this.batchData
     
    this.haveData=true
    })
  }
}







