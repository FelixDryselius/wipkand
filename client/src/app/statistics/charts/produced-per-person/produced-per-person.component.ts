import { Component, OnInit } from '@angular/core';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../operation/shared/services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';
import { Scoreboard } from '../../../../assets/interface/scoreboard';



@Component({
  selector: 'app-produced-per-person',
  templateUrl: './produced-per-person.component.html',
  styleUrls: ['./produced-per-person.component.css']
})
export class ProducedPerPersonComponent implements OnInit {
 
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
    yAxisLabel = "Produced per person per hour";
    xAxis=true;
    yAxis=true;
    timeline=false;
  
  
  
    constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }
  
    ngOnInit() {
      this.getData()
      console.log('produced per hour init');
                 
    }
  
    xAxisFormatting(data){
      return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'})
    }
  
    //Might be used later
    pressed(event) {
      console.log('event triggered');   
    }
  
    changeTimeSpan(query?:string){
      let tempQuery = '?limit='+ query;
      this.getData(tempQuery)
    }
    
    toggleBatches(){
      if(this.showBatches){
          this.displayData=this.prodDataContinues
          this.showBatches = false
      } else {
          this.displayData=this.prodDataSeparateBatches
          this.showBatches = true
      }
    }

    toggleTimeline(){
      if(this.timeline){
        this.timeline = false
      }else {
        this.timeline = true
      }
    }
  
  
    getData(query = '?limit=72')  {
  
      this.operationsService.getProductionStatistics(query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data =>{
  
        let productionStatistics = (data as QueryResponse).results as Scoreboard []
        
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
        let continuesDataArrayHolder = []
        let exptectedProductionPerPersonArrayHolder = []
        let prodDataContinuesTemp = []
        productionStatistics.forEach(element => {
          if(relevantBatchesId.indexOf(element.batch.batch_number) == -1 ){
            relevantBatchesId.push(element.batch.batch_number)                 
            productionDataPoints.push({
              'name':element.batch.batch_number,
              'series':[
                {
                  'value':Number(element.production_quantity)/Number(element.staff_quantity),
                  'name': new Date(element.time_stamp)
                }
             ]
            })
          } else {
            productionDataPoints.forEach(subEl =>{            
              if(subEl.name==element.batch.batch_number){             
                subEl.series.push({
                'value':Number(element.production_quantity)/Number(element.staff_quantity),
                'name': new Date(element.time_stamp)
                })
              }
            })
          }

         // Here it saves the 'continues production run'      
        continuesDataArrayHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': Number(element.production_quantity)/Number(element.staff_quantity)
          }
        )  
        exptectedProductionPerPersonArrayHolder.push(
          {
            'name':new Date(element.time_stamp),
            'value': 4200/Number(element.staff_quantity)
          }
        )
      })
        
      //adding expected value to separate production batches
      productionDataPoints.push({
        'name': 'Expected Production Quantity',
        'series': exptectedProductionPerPersonArrayHolder
      })

      //adding global variable
      this.prodDataSeparateBatches = productionDataPoints;
      
      //adding to global variable with continues batches
      this.prodDataContinues = [
        {
          'name':'Production Quantity',
          'series': continuesDataArrayHolder
        },
        {
          'name': 'Expected Production Quantity',
          'series': exptectedProductionPerPersonArrayHolder
        }
      ]
  
      
      //sets which type to show
      if(this.showBatches){
        this.displayData = this.prodDataSeparateBatches
      } else {
        this.displayData = this.prodDataContinues
      }
      this.haveData=true
    })
  }
}
  
  
  
  
  
  
  
  