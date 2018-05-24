import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

//3rd party and application imports
import { AuthAPIService } from '../../../auth/auth.service';
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OperationsService } from '../../../shared/application-services/operations.service';
import { QueryResponse } from '../../../shared/interfaces/query-response';
import { Scoreboard } from '../../../shared/interfaces/scoreboard';
import { Batch } from '../../../shared/interfaces/batch';
import { Product } from '../../../shared/interfaces/product';


@Component({
  selector: 'app-production-accumulated',
  templateUrl: './production-accumulated.component.html',
  styleUrls: ['./production-accumulated.component.css']
})


export class ProductionAccumulatedComponent implements OnInit {

  //Subscriber
  getDataSubscriber: Subscription;

  productionStatistics: Scoreboard[];
  displayDataList = [];
  haveData = false;
  currentBatch: Batch;
  currentProduct: Product;

  //Chart here we set options fot the chart
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Time";
  yAxisLabel = 'Accumulated production'
  xAxis = true;
  yAxis = true;
  timeline = false;


  constructor(private authAPI: AuthAPIService, private operationsService: OperationsService) { }

  ngOnInit() {
    this.getProductionData()
  }
  ngOnDestroy() {
    this.getDataSubscriber.unsubscribe()
  }

  xAxisFormatting(data) {
    return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  }
  getProductionData() {
    this.haveData = false;
    this.getDataSubscriber = this.operationsService.getBatch()
      .flatMap(data => {
        let batchList = (data as QueryResponse).results as Batch[]
        this.currentBatch = batchList[0]
        if (this.currentBatch) {
          return this.operationsService.getProduct(this.currentBatch.order.article_number)
        }
      })
      .flatMap(data => {
        this.currentProduct = data as Product
        if (this.currentProduct) {
          return this.operationsService.getProdStats('?batch_number=' + this.currentBatch.batch_number)
        }
      })

      //populate productionStatistics using this
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.productionStatistics = (data as QueryResponse).results as Scoreboard[]

        //populate tempSeries and productionGoalList
        let accumulatedProduction = 0;
        let tempSeries = []
        let productionGoalList = []
        
        // Is there data
        if (this.productionStatistics.length > 0) {
          for (let i = this.productionStatistics.length - 1; i >= 0; i--) {
            tempSeries.push(
              {
                "name": new Date(this.productionStatistics[i].time_stamp),
                "value": accumulatedProduction + this.productionStatistics[i].production_quantity
              },
            )
            productionGoalList.push(
              {
                "name": new Date(this.productionStatistics[i].time_stamp),
                "value": this.currentProduct.batch_production_goal // should be changed to another value
              },
            )
            accumulatedProduction = accumulatedProduction + this.productionStatistics[i].production_quantity
          }

          //adding both goal and accumulated production statistics to displayData
          this.displayDataList = [
            {
              'name': "Accumulated yield",
              'series': tempSeries
            },
            {
              'name': 'Production goal',
              'series': productionGoalList
            }
          ]
          this.haveData = true;
        }
      });
  }
}
