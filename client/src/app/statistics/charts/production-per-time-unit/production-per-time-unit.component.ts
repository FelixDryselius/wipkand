import { Component, OnInit } from '@angular/core';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../operation/shared/services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';
import { Scoreboard } from '../../../../assets/interface/scoreboard';


@Component({
  selector: 'app-production-per-time-unit',
  templateUrl: './production-per-time-unit.component.html',
  styleUrls: ['./production-per-time-unit.component.css']
})
export class ProductionPerTimeUnitComponent implements OnInit {
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
  

    //Might be used later
    pressed(event) {
      console.log('event triggered');   
    }

    chooseSpan(span:string){
      this.dateDisplayType = span;
      this.haveData = false
      this.getProductionStatisticsValues()
    }

    toggleStatisticType(type:string){
      this.displayType = type;
      this.haveData=false;
      this.chooseDisplayData()
    }
    changeTimeFrame(query:string){
      this.query ='?limit='+ query
      this.getProductionStatisticsValues()  
      
    }
 
  // This method populates this.productionStatistics and init this.populateDisplayData
  getProductionStatisticsValues()  {

    this.operationsService.getProductionStatistics(this.query)
    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{
      this.productionStatistics = (data as QueryResponse).results as Scoreboard []
      let tempProdStat = this.productionStatistics      
      this.populateDisplayData()
    })
    
  }

  chooseDisplayData(){
    if(this.displayType == 'yield'){
      this.displayData = this.yieldDisplayList;
      this.checkFullDays()
    } else if (this.displayType == 'ppmh'){
      this.displayData = this.ppmhDisplayList;
      this.checkFullDays()
    } 
    console.log(this.displayData);
    this.haveData = true
    console.log(this.productionStatistics);
    
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
          this.flaggedDays.push(currentDayHolder.toDateString())
                    
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
        this.flaggedDays.push(currentDayHolder.toDateString())            
      }

      //Sets prevVal
      previousVal = prodStat.time_stamp
    })
  }




  populateDisplayData(){
    if(this.dateDisplayType=='shift'){
      //TODO MAKE THIS WORK
    }

    //If the displayType is day
    else if(this.dateDisplayType=='day'){
      
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
    }

    //If displayType is week
    else if(this.dateDisplayType=='week'){
      
      //Here we populate weekDateList
      let weekDateList = [] 
      
      this.productionStatistics.forEach(prodStat => {
        
        let isMoreThanAWeek = true
        let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
                        
        weekDateList.forEach(weekDate =>{ 
          // This is to check if some value is more than a week away from midnight value     
          if(new Date(weekDate.name).getTime() >= midnightTime && midnightTime >(new Date(weekDate.name).getTime() - 604800000)) {
           isMoreThanAWeek = false
          }
        })
        if(isMoreThanAWeek){          
          weekDateList.push({
            'name': new Date(midnightTime),
            'value': 0
          })
          
        }
      })  

      // Here we populate yieldDisplayList and ppmhDisplayList
      let cloned = weekDateList.map(x => Object.assign({}, x));
      this.yieldDisplayList = weekDateList
      this.ppmhDisplayList = cloned
    
      this.yieldDisplayList.forEach(yieldDisplayElement => {
        this.productionStatistics.forEach(prodStat => {  
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0) 
          if(new Date(yieldDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(yieldDisplayElement.name).getTime() - 604800000)){
            yieldDisplayElement.value = yieldDisplayElement.value + prodStat.production_quantity
          }
        })
      })
      // populate ppmhDisplayList
      this.ppmhDisplayList.forEach(ppmhDisplayElement => {
        this.productionStatistics.forEach(prodStat => {
          
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
          if(new Date(ppmhDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(ppmhDisplayElement.name).getTime() - 604800000)){
            ppmhDisplayElement.value = ppmhDisplayElement.value + (Number(prodStat.production_quantity)/Number(prodStat.staff_quantity))
          }
        })
      }) 
    }

    //If displaytype is month
    else if(this.dateDisplayType=='month'){
      //Here we populate monthDateList
      let monthDateList = [] 
      this.productionStatistics.forEach(prodStat => {
        
        let isMoreThanMonth = true
        let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)                
        monthDateList.forEach(monthDate =>{ 
          //This is to check if some value is more than a week away from midnight value      
          if(new Date(monthDate.name).getTime() >= midnightTime && midnightTime >(new Date(monthDate.name).getTime() - 2419200000)) {
            isMoreThanMonth = false
          }
        })
        if(isMoreThanMonth){
          monthDateList.push({
            'name': new Date(midnightTime),
            'value': 0
          })
        }
      })  

      // Here we populate yieldDisplayList and ppmhDisplayList
      let cloned = monthDateList.map(x => Object.assign({}, x));
      this.yieldDisplayList = monthDateList
      this.ppmhDisplayList = cloned
    
      this.yieldDisplayList.forEach(yieldDisplayElement => {
        this.productionStatistics.forEach(prodStat => {  
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0) 
          if(new Date(yieldDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(yieldDisplayElement.name).getTime() - 2419200000)){
            yieldDisplayElement.value = yieldDisplayElement.value + prodStat.production_quantity
          }
        })
      })
      // populate ppmhDisplayList
      this.ppmhDisplayList.forEach(ppmhDisplayElement => {
        this.productionStatistics.forEach(prodStat => {
          
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
          if(new Date(ppmhDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(ppmhDisplayElement.name).getTime() - 2419200000)){
            ppmhDisplayElement.value = ppmhDisplayElement.value + (Number(prodStat.production_quantity)/Number(prodStat.staff_quantity))
          }
        })
      }) 
    }
    
    //If displayType is year
    else if(this.dateDisplayType=='year'){
      //Here we populate yearDateList
      let yearDateList = [] 
      this.productionStatistics.forEach(prodStat => {
        
        let isMoreThanAYear = true        
        let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)                
        yearDateList.forEach(yearDate =>{ 
          //This is to check if some value is more than a week away from midnight value      
          if(new Date(yearDate.name).getTime() >= midnightTime && midnightTime >(new Date(yearDate.name).getTime() - 31536000000)) {
            isMoreThanAYear = false
          }
        })
        if(isMoreThanAYear){
          yearDateList.push({
            'name': new Date(midnightTime),
            'value': 0
          })
        }
      })  

      // Here we populate yieldDisplayList and ppmhDisplayList
      let cloned = yearDateList.map(x => Object.assign({}, x));
      this.yieldDisplayList = yearDateList
      this.ppmhDisplayList = cloned
    
      this.yieldDisplayList.forEach(yieldDisplayElement => {
        this.productionStatistics.forEach(prodStat => {  
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0) 
          if(new Date(yieldDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(yieldDisplayElement.name).getTime() - 31536000000)){
            yieldDisplayElement.value = yieldDisplayElement.value + prodStat.production_quantity
          }
        })
      })
      // populate ppmhDisplayList
      this.ppmhDisplayList.forEach(ppmhDisplayElement => {
        this.productionStatistics.forEach(prodStat => {
          
          let midnightTime = new Date(prodStat.time_stamp).setHours(0,0,0,0)
          if(new Date(ppmhDisplayElement.name).getTime() >= midnightTime && midnightTime > (new Date(ppmhDisplayElement.name).getTime() - 31536000000)){
            ppmhDisplayElement.value = ppmhDisplayElement.value + (Number(prodStat.production_quantity)/Number(prodStat.staff_quantity))
          }
        })
      }) 
    }
   

    this.chooseDisplayData()
  }

}
  
  
  
  
  
  
  
  