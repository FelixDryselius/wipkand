import { Component, OnInit } from '@angular/core';

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element } from 'protractor';
import { Floorstock } from '../../../../assets/interface/floorstock';
import { FloorstockItem } from '../../../../assets/interface/floorstock_item';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs/Observable';
import { OperationsService } from '../../../operation/shared/services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';


//test LET THIS BE
// import { ComboChartComponent } from '../combo-chart/combo-chart.component';
// import { ComboSeriesVerticalComponent } from '../combo-chart/combo-series-vertical.component';
// import { LineChart } from '../combo-chart/combo-chart-data';
// import { LineChartSeries } from '../combo-chart/combo-chart-data';
// import { BarChart } from '../combo-chart/combo-chart-data';


@Component({
  selector: 'app-floorstock-chart',
  templateUrl: './floorstock-chart.component.html',
  styleUrls: ['./floorstock-chart.component.css']
})
export class FloorstockChartComponent implements OnInit {
 // LET IT BE
  // chartType = 'combo-chart';
  // lineChart = LineChart;
  // lineChartSeries = LineChartSeries;
  // barChart  = BarChart;
  // barScheme = {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#AAAAAb','AAAAAC']};
  // barScheme2 = {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#AAAAAb','AAAAAC']};

  // showXAxis = true;
  // showYAxis = true;
  // showXAxisLabel = true;
  // showYAxisLabel = true;
  // showRightYAxisLabel = true;
  // xAxisLabel = 'test';
  // yAxisLabel = 'test';
  // yAxisLabelRight = 'test';


  
  
  
  //Chart here we set options fot the chart
  animations = true;
  showLegend = true;
  legendTitle = 'Floorstock item name: '
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxis = true;
  yAxis = true;
  xAxisLabel = 'Batchnumber';
  yAxisLabel = 'Quantity';
   

  // Data:
  floorstockChange = [];
  displayData = [];
  floorstockItems = []

  constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }

  ngOnInit() {
    this.getFloorstockData()
  }

  // Function fired if pressing the bar chart
  pressed(event){
    console.log(event);
  }
  
 // This function populates floorstockItems and displayData
 //TODO implement functions to enable the user to choose how far bach he, or she wants to go, eg another 'query'
 getFloorstockData(query='?limit=90'){

  this.operationsService.getFloorstockItems()
  .switchMap(itemData =>{
    this.setFloorstockItemNames(itemData)
    return this.operationsService.getFloorstockChanges(query)
  })
  .retryWhen(error => this.authAPI.checkHttpRetry(error))
  .subscribe(data =>{
    this.floorstockChange = (data as QueryResponse).results as Floorstock []        
    this.trimFloorstockChange()
    this.combineFloorstockItemName()
    
    let uniqueBatchNumbers = []
    let tempDisplayData = []

    
    this.floorstockChange.forEach(element => {
      if(uniqueBatchNumbers.indexOf(element.batch) == -1 ){
        uniqueBatchNumbers.push(element.batch)                 
        tempDisplayData.push({
          'name':element.batch,
          'series':[
            {
              'value':element.quantity,
              'name': element.floorstock_item
            }
          ]
        })
      } else {
        tempDisplayData.forEach(subEl =>{            
          if(subEl.name==element.batch){             
            subEl.series.push({
            'value':element.quantity,
            'name': element.floorstock_item
            })
          }
        })
      }       
    });
    this.displayData = tempDisplayData
    console.log(this.displayData);
    console.log(this.floorstockChange);
  })

}


  // This function populates floorstockItemsNames
  setFloorstockItemNames(data){
      this.floorstockItems = (data as QueryResponse).results as FloorstockItem []        
  }
      
  trimFloorstockChange(){
    let index = this.floorstockChange.length - 1
    let lastBatchNumber = this.floorstockChange[index].batch

    // This is to eliminate 'non filled' batches with floorstock change
    while (lastBatchNumber == this.floorstockChange[index].batch){
      this.floorstockChange.pop()
      index = index - 1      
    }
  }

     
  combineFloorstockItemName(){
    this.floorstockChange.forEach(element =>{
      this.floorstockItems.forEach(itemElement =>{
        if(element.floorstock_item == itemElement.item_id){
          element.floorstock_item = itemElement.item_name
        }
      }) 
    })
    console.log('floorstockItems with new name: ' +this.floorstockChange );
  }    
      
}
      
      
      
      
      
      
      
























