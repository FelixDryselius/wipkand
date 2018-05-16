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
  selector: 'app-production-per-time-unit',
  templateUrl: './production-per-time-unit.component.html',
  styleUrls: ['./production-per-time-unit.component.css']
})
export class ProductionPerTimeUnitComponent implements OnInit {
    //Subscribers
    productionStatisticSubscriber:Subscription;
  
    //Data
    productionStatistics = [];
    yieldDisplayList = [];
    ppmhDisplayList = [];
    displayData = [];
    dateDisplayType = 'day';
    displayType = 'yield';
    haveData=false;
    query = '?limit=168'

    flaggedDays = []

  
    //Chart here we set options fot the chart
    showLegend = true;
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    showLabels = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    xAxisLabel = "Date";
    yAxisLabel = "Produced per "+ this.dateDisplayType;
    xAxis=true;
    yAxis=true;
  
  
    constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }
  
    ngOnInit() {
      this.getProductionStatisticsValues()
    }

    ngOnDestroy(){
      this.productionStatisticSubscriber.unsubscribe()
    }


  //TODO MAKE THIS FUCKING DISGUSTING THING WORK......

    // xAxisFormatting(data){
    //   console.log(this.flaggedDays.map(x=>{return x}));
      
    //   if(this.flaggedDays){
    //   console.log(data);
    //   console.log(this.flaggedDays);
      
    //   if(this.flaggedDays.indexOf(data)!= -1){
    //     return data + ' not complete'
    //   }
    // }else {
    //   return data.toDateString()
    // }
    // }
  

    toggleStatisticType(type:string){
      this.displayType = type;
      this.chooseDisplayData()
    }
    changeTimeFrame(millisecondsBack:number){
      let endDate = Date.now() 
      let startDate = endDate - millisecondsBack;
      let tempQuery = '?start_date=' + new Date(startDate).toISOString()+'&end_date=' + new Date(endDate).toISOString()+'&limit=72'
      this.getProductionStatisticsValues(tempQuery)  
      
    }
 
  // This method populates this.productionStatistics and init populateDisplayData()
  getProductionStatisticsValues(query?:string)  {

    this.productionStatisticSubscriber = this.operationsService.getProductionStatistics(query)
    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{
      this.productionStatistics = (data as QueryResponse).results as Scoreboard []
      console.log(this.productionStatistics);
           
      this.populateDisplayData()
    })
    
  }

  chooseDisplayData(){
    if(this.displayType == 'yield'){
      this.displayData = this.yieldDisplayList;
    } else if (this.displayType == 'ppmh'){
      this.displayData = this.ppmhDisplayList;
    } 
  }


  //This populates yieldDisplayList and ppmhDisplayList and initiates chooseDisplayData()
  populateDisplayData(){
   this.haveData = false
    //Here we populate dayDateList
    let dayDateList = []
    this.productionStatistics.forEach(prodStat => {
      
      let isMoreThanADay = true
      let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)                        
      dayDateList.forEach(dayDate =>{ 
        
        //This is to check if some value is more than a day away from midnight value                
        if(new Date(dayDate.name).getTime() >= midnightTime && midnightTime >(new Date(dayDate.name).getTime() - 86400000)){            
          isMoreThanADay = false
        }
      })
      if(isMoreThanADay){
        dayDateList.push({
          'name': new Date(midnightTime),
          'value': 0 
        })          
      }
    })       
    
    // Here we populate yieldDisplayList and ppmhDisplayList, we need to make a copy for it to work
    let cloned = dayDateList.map(x => Object.assign({}, x));
    this.yieldDisplayList = dayDateList
    this.ppmhDisplayList = cloned
    
   // populate yieldDisplayList
    this.yieldDisplayList.forEach(yieldDisplayElement => {
      this.productionStatistics.forEach(prodStat => {  
        let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
        if(new Date(yieldDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(yieldDisplayElement.name).getTime() - 86400000)){
          yieldDisplayElement.value = yieldDisplayElement.value + prodStat.production_quantity
          
        }
      })
    })
    // populate ppmhDisplayList
    this.ppmhDisplayList.forEach(ppmhDisplayElement => {
      this.productionStatistics.forEach(prodStat => {
        let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
        if(new Date(ppmhDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(ppmhDisplayElement.name).getTime() - 86400000)){
          ppmhDisplayElement.value = ppmhDisplayElement.value + (Number(prodStat.production_quantity)/Number(prodStat.staff_quantity))
        }
      })
    })
    this.haveData = true
    this.chooseDisplayData()
  }

}
  
  
  
  
  
  
  
  