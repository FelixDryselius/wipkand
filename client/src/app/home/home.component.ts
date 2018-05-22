import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

// Application imports
import { AuthAPIService } from '../auth/auth.service';
import { Batch } from '../shared/interfaces/batch';
import { OperationsService } from '../shared/application-services/operations.service';
import { CommentService } from '../shared/application-services/comment.service';
import { QueryResponse } from '../shared/interfaces/query-response';
import { ProductionAccumulatedComponent } from '../statistics/charts/production-accumulated/production-accumulated.component';

// FOR STATISTICS
import { Subscription } from 'rxjs'
import { element, logging } from 'protractor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Scoreboard } from '../../assets/interface/scoreboard';
import { Product } from '../shared/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private productionObservable: Observable<any>;
  private productionSub: any;
  prodStats: {};
  private prodDataColumns = ['Time stamp', 'On shift', 'Produced', 'Signature']

  batches: [Batch]
  active: any;

  getBatchesSub: any;

  constructor(
    private authAPI: AuthAPIService,
    private operationsService: OperationsService,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute) { }

  // FOR STATISTICS
  //Subscriber
  getDataSubscriber: Subscription;

  productionStatistics = [];
  displayDataList = [];
  haveData = false;
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

  latestBatch;
  comments;
  commentsSub;
  recentComments = [];
  recentProd = [];
  recentEvents = [];

  ngOnInit() {
    this.getProductionData()
    this.getRecent()
  }

  reworkBatch() {
    this.router.navigate(['/operation/batch-rework'])
  }

  getRecent() {
    this.commentsSub = this.commentService.getComment()
      .switchMap(data => {
        this.comments = (data as QueryResponse).results
        for (let comment in this.comments) {
          if (this.recentComments.length < 3) {
            this.recentComments.push(this.comments[comment])
          }
        }
        return this.productionObservable = this.operationsService.getProductionStatistics()
      })

      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.prodStats = (data as QueryResponse).results
        for (let stat in this.prodStats) {
          if (this.recentProd.length < 3) {
            this.recentProd.push(this.prodStats[stat])
          }
        }
       // this.sortRecent()
      });
  }

  /*sortRecent() {
    function mergeSorted(a, b) {
      let sorted = new Array(a.length + b.length), i = 0, j = 0, k = 0;
      while (i < a.length && j < b.length) {
        if (a[i].time_stamp > b[j].post_date) {
          sorted[k] = a[i];
          i++;
        } else {
          sorted[k] = b[j];
          j++;
        }
        k++;
      }
      while (i < a.length) {
        sorted[k] = a[i];
        i++;
        k++;
      }
      while (j < b.length) {
        sorted[k] = b[j];
        j++;
        k++;
      }
      return sorted;
    }
    this.recentEvents = mergeSorted(this.prodList, this.commentList)
  }*/

  // FOR STATISTICS
  xAxisFormatting(data) {
    return data.toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  }
  getProductionData() {
    this.haveData = false;
    this.getDataSubscriber = this.operationsService.getBatchDetail()
      .flatMap(data => {
        let batchList = (data as QueryResponse).results as Batch[]
        this.latestBatch = batchList[0]
        if (this.latestBatch.end_date == null) {
          this.active = 'Current'
        }
        else {
          this.active = 'Most recent'
        }
        return this.operationsService.getProduct(this.latestBatch.order.article_number)
      })
      .flatMap(data => {
        this.currentProduct = data as Product
        return this.operationsService.getProdStats('?batch_number=' + this.latestBatch.batch_number)
      })

      //populate productionStatistics using this
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.productionStatistics = (data as QueryResponse).results as Scoreboard[]
        //populate tempSeries and productionGoalList
        let accumulatedProduction = 0;
        let tempSeries = []
        let productionGoalList = []
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
            'name': this.productionStatistics[0].batch.batch_number + "'s accumulated yield",
            'series': tempSeries
          },
          {
            'name': 'Production goal',
            'series': productionGoalList
          }
        ]
      });
    this.haveData = true;
  }

  ngOnDestroy(): void {
  }

}
