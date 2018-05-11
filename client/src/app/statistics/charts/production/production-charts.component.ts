import { Component, OnInit } from '@angular/core';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../operation/shared/services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';
import { Scoreboard } from '../../../../assets/interface/scoreboard';


@Component({
  selector: 'app-production-charts',
  templateUrl: './production-charts.component.html',
  styleUrls: ['./production-charts.component.css']
})
export class StatisticsChartsComponent implements OnInit {
  
  //data
  haveData=false;
  displayData;
  showBatches = false;
  prodDataSeparateBatches = [];
  prodDataContinues = [];

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
    this.getProductionData()           
  }

  xAxisFormatting(data){
    return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'})
  }

  //Might be used later
  pressed(event) {
    console.log('event triggered');   
  }

  changeTimeSpan(query?:string){
    let tempQuery = '?limit='+query;
    this.getProductionData(tempQuery)
  }
  
  toggleBatches(toggle:boolean){
    console.log('toggleBatches: '+toggle);
    this.showBatches = toggle
    if(toggle){
      this.displayData=this.prodDataSeparateBatches
    } else {
      this.displayData=this.prodDataContinues
    }
  }

  getProductionData(query = '?limit=72')  {

    this.operationsService.getProductionStatistics(query)
    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{
      let productionStatistics
      productionStatistics = (data as QueryResponse).results as Scoreboard []
      
      // Creating an to match what ngx-charts need to have
      // the element looks like this:
      //      chartdataLine =[
      //        {
      //          'name':batch_number          (this is unique )
      //          'series': [
      //            {
      //              'name':batch_number,
      //              'value:' production_quantity
      //            }
      //          ]
      //        }
      //      ] 
      let relevantBatchesId = []
      let productionDataPoints = []
      let arrayHolder = []
      let prodDataContinuesTemp = []
      let exptectedProductionHolder = []

      productionStatistics.forEach(element => {
        if(relevantBatchesId.indexOf(element.batch) == -1 ){
          relevantBatchesId.push(element.batch)                 
          productionDataPoints.push({
            'name':element.batch,
            'series':[
              {
                'value':element.production_quantity,
                'name': new Date(element.time_stamp)
              }
           ]
          })
        } else {
          productionDataPoints.forEach(subEl =>{            
            if(subEl.name==element.batch){             
              subEl.series.push({
              'value':element.production_quantity,
              'name': new Date(element.time_stamp)
              })
            }
          })
        }
        // Here it saves the 'continues production run'      
        arrayHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': element.production_quantity
          }
        )  
        exptectedProductionHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': 4200
          }
        )
      })
        
      this.prodDataSeparateBatches = productionDataPoints;
      this.prodDataSeparateBatches.push({
        'name': 'Expected Production Quantity',
        'series': exptectedProductionHolder
      })
      this.prodDataContinues = [
        {
          'name':'Production Quantity',
          'series': arrayHolder
        }
      ]
  
      console.log(this.prodDataSeparateBatches);
      
    //sets which type to show
    if(this.showBatches){
      this.displayData = this.prodDataSeparateBatches
    } else {
      this.displayData = this.prodDataContinues
    }
    this.haveData=true
  });    
  }
}