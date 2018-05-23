import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element } from 'protractor';
import { Floorstock } from '../../../../assets/interface/floorstock';
import { FloorstockItem } from '../../../../assets/interface/floorstock_item';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs/Observable';
import { OperationsService } from '../../../shared/application-services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';



@Component({
  selector: 'app-floorstock-chart',
  templateUrl: './floorstock-chart.component.html',
  styleUrls: ['./floorstock-chart.component.css']
})
export class FloorstockChartComponent implements OnInit {
  //Subscriber
  floorstockSubscriber: Subscription;


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
  floorstockItems = [];
  haveData = false;

  //navigation variables
  previousLink: string;
  nextLink: string;
  query = '?limit=5&offset=0'

  constructor(private authAPI: AuthAPIService, private operationsService: OperationsService) { }

  ngOnInit() {
    this.getFloorstockData()
  }
  ngOnDestroy() {
    this.floorstockSubscriber.unsubscribe()
  }

  // This function populates floorstockItems and displayData
  getFloorstockData() {
    this.haveData = false;

    //this part populates floorstockItems which contains correct names for all floorstock change
    this.floorstockSubscriber = this.operationsService.getFloorstockItems()
      .switchMap(itemData => {
        this.floorstockItems = (itemData as QueryResponse).results as FloorstockItem[]
        // Is there data?
        if (this.floorstockItems.length > 0) {
          return this.operationsService.getFloorstockChanges(this.query)
        }
      })
      //Here this.floorstockChange gets populated
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.nextLink = (data as QueryResponse).next;
        this.previousLink = (data as QueryResponse).previous;
        let tempFloorstockChange = (data as QueryResponse).results as Floorstock[]

        //Correct names are combined with this.floorstockChange from this.floorstockItems
        tempFloorstockChange = this.combineFloorstockItemName(tempFloorstockChange)
        //Trims floorstockChange all displayed batches display all their floorstock changes
        this.floorstockChange = this.trimFloorstockChange(tempFloorstockChange)

        // Is there data?
        if (this.floorstockChange.length > 0) {
          //Here tempDisplayData is populated with info from this.floorstockChange and structured 
          //so that the chart can display it correctly.
          let uniqueBatchNumbers = []
          this.displayData = []
          this.floorstockChange.forEach(element => {
            if (uniqueBatchNumbers.indexOf(element.batch.batch_number) == -1) {
              uniqueBatchNumbers.push(element.batch.batch_number)
              this.displayData.push({
                'name': element.batch.batch_number,
                'series': [
                  {
                    'value': element.quantity,
                    'name': element.floorstock_item
                  }
                ]
              })
            } else {
              this.displayData.forEach(subEl => {
                if (subEl.name == element.batch.batch_number) {
                  subEl.series.push({
                    'value': element.quantity,
                    'name': element.floorstock_item
                  })
                }
              })
            }
          });
          this.haveData = true;
        }
      })

  }
  // This is to eliminate 'non filled' batches with floorstock change
  //NOTE THIS ONLY TRIMS THE LAST NOT THE FIRST ONE
  trimFloorstockChange(floorstockChange) {
    let index = floorstockChange.length - 1
    let lastBatchNumber = floorstockChange[index].batch.batch_number
    while (lastBatchNumber == floorstockChange[index].batch.batch_number) {
      floorstockChange.pop()
      index = index - 1
    }
    return floorstockChange
  }

  //Fixes query and navigates to next api data point
  goToNextSet() {
    if (this.nextLink) {
      let index = this.nextLink.indexOf('?')
      this.query = this.nextLink.slice(index)
      this.getFloorstockData()
    }
  }
  //Fixes query and navigates to previous api data point
  goToPreviousSet() {
    if (this.previousLink) {
      let index = this.previousLink.indexOf('?')
      this.query = this.previousLink.slice(index)
      this.getFloorstockData()
    }
  }
  //This function sets the api offset in this.query and reloads data with the new query
  setOffsetSize(size: string) {
    let andIndex = this.query.indexOf('&')
    let questionIndex = this.query.indexOf('?')
    if (andIndex != -1) {
      let toReplace = this.query.slice(questionIndex, andIndex)
      this.query = this.query.replace(toReplace, '?limit=' + size)
    } else {
      let toReplace = this.query.slice(questionIndex)
      this.query = this.query.replace(toReplace, '?limit=' + size)
    }
    this.getFloorstockData()
  }

  //Combines floorstockChanges with floorstockItem names for a more rich experience
  combineFloorstockItemName(tempFloorstockChange) {
    tempFloorstockChange.forEach(element => {
      this.floorstockItems.forEach(floorstockItem => {
        if (element.floorstock_item == floorstockItem.item_id) {
          element.floorstock_item = floorstockItem.item_name
        }
      })
    })
    return tempFloorstockChange
  }

}































