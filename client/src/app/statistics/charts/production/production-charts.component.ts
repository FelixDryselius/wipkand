import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../shared/application-services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';
import { Scoreboard } from '../../../../assets/interface/scoreboard';

@Component({
  selector: 'app-production-charts',
  templateUrl: './production-charts.component.html',
  styleUrls: ['./production-charts.component.css']
})
export class StatisticsChartsComponent implements OnInit {
  //Subscriber
  getProductionStatisticsSubscriber: Subscription
  //data
  haveData=false;

  //the following three is to make sure all options are open to the user
  displayData = []; // this is the variable that's always showing
  displayYield = [];
  displayPpmh = [];

  productionStatistics = []
  
  yieldPerHourSeparateBatchList = [] ;
  ppmhSeparateBatchList = [];

  continuesYieldPerHourList = [];
  continuesPpmhList = [];

  setOffset = 0;
  setLimit = 72;

  //Chart here we set options fot the chart
  showBatches = false;
  showYield = true;
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Date";
  yAxisLabel = 'Produced per hour'
  xAxis=true;
  yAxis=true;
  timeline=false;


  constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }

  ngOnInit() {
    this.getProductionData('?limit='+this.setLimit+'&offset='+this.setOffset)           
  }

  ngOnDestroy(){
    this.getProductionStatisticsSubscriber.unsubscribe()
  }

  xAxisFormatting(data){
    return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'})
  }
  goToNextSet(){
    this.setOffset = this.setOffset + this.setLimit;
    this.getProductionData('?limit='+this.setLimit+'&offset='+this.setOffset)  
  
  }
  //Fixes query and navigates to previous api data point
  goToPreviousSet(){
    this.setOffset = this.setOffset - this.setLimit;
    this.getProductionData('?limit='+this.setLimit+'&offset='+this.setOffset)  
  }

  //to update display options
  toggleShowBatches(){
    if(this.showBatches){
      this.showBatches = false;
    } else {
      this.showBatches = true;
    }
    this.updateDisplayData()
  }

  //to update display options
  toggleShowYield(){
    if(this.showYield){
      this.yAxisLabel = 'Produced per man hour'
      this.showYield = false;
    } else {
      this.yAxisLabel = 'Produced per hour'
      this.showYield = true;
    }
    this.updateDisplayData()
  }

  //to update display options
  updateDisplayData(){
    if(this.showBatches){
      this.displayYield = this.yieldPerHourSeparateBatchList
      this.displayPpmh = this.ppmhSeparateBatchList
    } else {
      this.displayYield = this.continuesYieldPerHourList
      this.displayPpmh = this.continuesPpmhList
    }    
    if(this.showYield){
      this.displayData = this.displayYield;
    } else {
      this.displayData = this.displayPpmh;
    }
    
  }

  toggleTimeline(){
    if(this.timeline){
      this.timeline = false
    }else {
      this.timeline = true
    }
  }

  getProductionData(query?:string)  {
    //sets all the dataholders to null
    this.yieldPerHourSeparateBatchList = [] ;
    this.ppmhSeparateBatchList = [];
    this.continuesYieldPerHourList = [];
    this.continuesPpmhList = [];
    this.haveData = false

    this.getProductionStatisticsSubscriber = this.operationsService.getProductionStatistics(query)

    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{
      
      this.productionStatistics = (data as QueryResponse).results as Scoreboard []
      
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
      let exptectedProductionHolder = []
      let exptectedPpmhHolder = []

      // In the following part yieldPerHourSeparateBatchList, ppmhSeparateBatchList
      // continuesyieldPerHourList and continuesPpmhList are populated
      this.productionStatistics.forEach(element => {
        if(relevantBatchesId.indexOf(element.batch.id) == -1 ){
          relevantBatchesId.push(element.batch.id)
        
          this.yieldPerHourSeparateBatchList.push({
            'name':element.batch.batch_number,
            'series':[
              {
                'value':element.production_quantity,
                'name': new Date(element.time_stamp)
              }
           ]
          })
          this.ppmhSeparateBatchList.push({
            'name':element.batch.batch_number,
            'series':[
              {
                'value': element.production_quantity/element.staff_quantity,
                'name': new Date(element.time_stamp)
              }
           ]
          })

        } else {
          this.yieldPerHourSeparateBatchList.forEach(subEl =>{            
            if(subEl.name==element.batch.batch_number){             
              subEl.series.push({
              'value':element.production_quantity,
              'name': new Date(element.time_stamp)
              })
            }
          })
          this.ppmhSeparateBatchList.forEach(subElement =>{            
            if(subElement.name==element.batch.batch_number){             
              subElement.series.push({
              'value':element.production_quantity/element.staff_quantity,
              'name': new Date(element.time_stamp)
              })
            }
          })
        }

        // Here it saves the 'continues production run'      
        this.continuesYieldPerHourList.push(
          {
            'name':new Date(element.time_stamp),
            'value': element.production_quantity
          }
        )
        this.continuesPpmhList.push(
          {
            'name':new Date(element.time_stamp),
            'value': element.production_quantity/element.staff_quantity
          }
        )
        //Maybe remove?
        exptectedProductionHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': 4200
          }
        )
        exptectedPpmhHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': 4200/element.staff_quantity
          }
        )
      })
      //Finished populating yieldPerHourSeparateBatchList, ppmhSeparateBatchList, continuesYieldPerHourList and continuesPpmhList
      

      //adding expected value to yieldPerHourSeparateBatchList
      this.yieldPerHourSeparateBatchList.push({
        'name': 'Expected Production Quantity',
        'series': exptectedProductionHolder
      })
      
      //adding expected value to ppmhSeparateBatchList
      this.ppmhSeparateBatchList.push({
        'name': 'Expected Production Quantity',
        'series': exptectedPpmhHolder
      })

      //adding expected value to continuesYieldPerHourList
      this.continuesYieldPerHourList = [
        {
          'name':'Production Quantity',
          'series': this.continuesYieldPerHourList
        },
        {
          'name': 'Expected Production Quantity',
          'series': exptectedProductionHolder
        }
      ]

      //adding expected value to continuesPpmhList
      this.continuesPpmhList = [
        {
          'name':'Production Quantity',
          'series': this.continuesPpmhList
        },
        {
          'name': 'Expected Production Quantity',
          'series': exptectedPpmhHolder
        }
      ]   
     
    //sets which type to show
    this.updateDisplayData()
    this.haveData=true         
  });      
  }
}
