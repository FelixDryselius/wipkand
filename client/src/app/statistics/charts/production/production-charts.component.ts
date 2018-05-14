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
  //the following three is to make sure all options are open to the user
  displayData = []; // this is the variable that's always showing
  displayYield = [];
  displayPpmh = [];

  flaggedDays = [];
  productionStatistics = []

  showBatches = false;
  showYield = true;
  
  yieldPerHourSeparateBatchList = [] ;
  ppmhSeparateBatchList = [];

  continuesYieldPerHourList = [];
  continuesPpmhList = [];

  //Chart here we set options fot the chart
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
    this.getProductionData()           
  }

  xAxisFormatting(data){
    return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'})
  }

  //Might be used later
  pressed(event) {
    console.log('event triggered');   
    console.log(event);
    
  }

  changeTimeSpan(query?:string){
    let tempQuery = '?limit='+query;
    this.getProductionData(tempQuery)
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

  checkFullDays(){
    let currentDayHolder = new Date(this.productionStatistics[0].time_stamp)    
    
    currentDayHolder.setHours(0,0,0,0)
    let previousVal = new Date(this.productionStatistics[0].time_stamp)
    
    let has00 = false;
    let has23 = false

    this.flaggedDays = []
    this.productionStatistics.forEach(prodStat=>{     

      //Checks if we have moved on to the next day
      if(( new Date(currentDayHolder).getTime() - new Date(prodStat.time_stamp).getTime()) >= 86400000){

        //Should flag?
        if(!has00 || !has23){
          this.flaggedDays.push(currentDayHolder)

          //Sets prevVal
          previousVal = prodStat.time_stamp
        } 
        //reset values 
        has00 = false;
        has23 = false;
        currentDayHolder = new Date(prodStat.time_stamp);
        currentDayHolder.setHours(0,0,0,0)
      }

      //Checks if we have the 00th or 23th hour
      let tempHours = new Date(prodStat.time_stamp).getHours()
      if(tempHours == 0){
        has00 = true;
      } else if(tempHours == 23){
        has23 = true;
      }

      //Checks if there is a gap between two prodStat, also guards for if the day was changed
      if( ((new Date(previousVal).getTime() - new Date(prodStat.time_stamp).getTime())  > 3600000) && ((new Date(prodStat.time_stamp).getTime() - new Date(currentDayHolder).getTime()) < 86400000) ) {
        this.flaggedDays.push(currentDayHolder)            
      }

      //Sets prevVal
      previousVal = prodStat.time_stamp
    })    
  }

  getProductionData(query = '?limit=72')  {
    //sets all the dataholders to null
    this.yieldPerHourSeparateBatchList = [] ;
    this.ppmhSeparateBatchList = [];
    this.continuesYieldPerHourList = [];
    this.continuesPpmhList = [];
    this.haveData = false

    this.operationsService.getProductionStatistics(query)
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
