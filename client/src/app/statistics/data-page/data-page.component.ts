import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { Comment } from '../../shared/interfaces/comment';
import { CommentService } from '../../shared/application-services/comment.service';
import { DataPageDisplayData } from '../../shared/interfaces/dataPageDisplayData';
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Order } from '../../shared/interfaces/order';
import { Product } from '../../shared/interfaces/product';
import { element } from 'protractor';


@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {
  //how to display the page
  offset = 0;
  limit = 20;

  //Subscribeables:
  private batchSub: Subscription;
  private commentSub: Subscription;


  testList = ['hej', 'da']
  displayCommentsList = []
  commentBatchNumber: string;
  displayComments = false;
  productList: Product[];
  displayDataList = [];
  hasValues = false;
  testSpan = 2
  canGoNext: any;
  canGoPrevious: any;

  constructor(
    private authAPI: AuthAPIService,
    private route: ActivatedRoute,
    private location: Location,
    private operationsService: OperationsService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.getBatchDetails()
  }

  ngOnDestroy() {
    this.batchSub.unsubscribe()
    if (this.commentSub) {
      this.commentSub.unsubscribe()
    }
  }

  //Fixes query and navigates to next api data point
  goToNextSet() {
    if (this.canGoNext) {
      this.offset = this.offset + this.limit
      this.getBatchDetails()
    }
  }
  //Fixes query and navigates to previous api data point
  goToPreviousSet() {
    if (this.canGoPrevious) {
      this.offset = this.offset - this.limit
      this.getBatchDetails()
    }
  }



  getBatchDetails() {
    //Initiating the query and observable
    let query = '?limit=' + this.limit + '&' + 'offset=' + this.offset;
    let batchObservable = this.operationsService.getBatch(query)

    //Subscribing to the obs and getting the data
    this.batchSub = this.operationsService.getProduct()
      .switchMap(data => {
        this.productList = (data as QueryResponse).results as Product[]
        return batchObservable
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.canGoNext = (data as QueryResponse).next
        this.canGoPrevious = (data as QueryResponse).previous
        let batchItemList = (data as QueryResponse).results as Batch[]

        // Populating the display data
        this.populateDisplayDataList(batchItemList)
      })
  }

  getComments(batchNumber: string) {
    //Initiating the query and emptying:
    this.displayComments = false
    let query = '?batch_number=' + batchNumber
    this.displayCommentsList = [];
    this.commentBatchNumber = batchNumber

    //Subscribing and getting the data
    this.commentSub = this.commentService.getComment(query)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.displayCommentsList = (data as QueryResponse).results as Comment[]

        if (this.displayCommentsList.length != 0) {
          this.displayComments = true
        }
      })

  }

  milisecondsToTimeString(miliseconds: number, with_seconds: boolean) {
    if (miliseconds) {
      let raw_sec = Math.floor(miliseconds / 1000);
      let hours = Math.floor(raw_sec / 3600);
      let minutes = Math.floor((raw_sec - (hours * 3600)) / 60);
      let str_hours: string = hours.toString()
      let str_minutes: string = minutes.toString()

      if (with_seconds) {
        let seconds = raw_sec - (hours * 3600) - (minutes * 60);
        let str_seconds: string = seconds.toString()
        return str_hours + ' hours, ' + str_minutes + ' minutes, ' + str_seconds + ' seconds';
      } else {
        return str_hours + ' hours, ' + str_minutes + ' minutes';
      }
    } else {
      return null
    }
  }


  populateDisplayDataList(batchItemList: Batch[]) {
    // empty for each refresh
    this.displayDataList = []
    this.hasValues = false

    batchItemList.forEach(batch => {
      //This is to link each batch to the right reference storage number
      let tempReferenceStorage
      this.productList.forEach(product => {
        if (product.article_number == batch.order.article_number)
          tempReferenceStorage = product.reference_storage
      })

      // Because the http response from the server is strings these need to be typed as Date again
      batch.start_date = new Date(batch.start_date)
      
      let _batch_time;
      if (batch.end_date) {
        batch.end_date = new Date(batch.end_date)
        _batch_time = this.milisecondsToTimeString((batch.end_date.getTime() - batch.start_date.getTime()), false)
      }
      let _rework_time
      if (batch.rework_date) {
        batch.rework_date = new Date(batch.rework_date)
        _rework_time = this.milisecondsToTimeString((batch.rework_date.getTime() - batch.end_date.getTime()), false)
      }

      //Filling the displayDataList
      let tempDisplayData = {
        batch_id: batch.id,
        order_number: batch.order.order_number,
        batch_number: batch.batch_number,
        article_number: batch.order.article_number,
        start_date: batch.start_date,
        end_date: batch.end_date,
        batch_time: _batch_time,
        reference_storage: tempReferenceStorage,
        scrap: batch.scrap,
        yield: batch.production_yield,
        hmi1_good: batch.hmi1_good,
        hmi1_bad: batch.hmi1_bad,
        hmi1_total: batch.hmi1_good - batch.hmi1_bad,
        hmi2_good: batch.hmi2_good,
        hmi2_bad: batch.hmi2_bad,
        hmi2_total: batch.hmi2_good - batch.hmi2_good,
        grand_match_total: (batch.hmi1_good - batch.hmi1_bad) - (batch.hmi2_good - batch.hmi2_good),
        rework_date: batch.rework_date,
        est_pick_replace: (batch.hmi1_bad + batch.hmi2_bad) - batch.scrap * 10 - batch.applied_labels,
        applied_labels: batch.applied_labels,
        rework_time: _rework_time
      } as DataPageDisplayData

      this.displayDataList.push(tempDisplayData)


      // this.displayDataList.push({
      //   batch_id: batch.id,
      //   order_number: batch.order.order_number,
      //   batch_number: batch.batch_number,
      //   article_number: batch.order.article_number,
      //   start_date: batch.start_date,
      //   end_date: batch.end_date,
      //   batch_time: new Date(batch.end_date.getDate() - batch.start_date.getDate()),
      //   reference_storage: tempReferenceStorage,
      //   scrap: batch.scrap,
      //   yield: batch.production_yield,
      //   hmi1_good: batch.hmi1_good,
      //   hmi1_bad: batch.hmi1_bad,
      //   hmi1_total: batch.hmi1_good - batch.hmi1_bad,
      //   hmi2_good: batch.hmi2_good,
      //   hmi2_bad: batch.hmi2_bad,
      //   hmi2_total: batch.hmi2_good - batch.hmi2_good,
      //   grand_match_total: (batch.hmi1_good - batch.hmi1_bad) - (batch.hmi2_good - batch.hmi2_good),
      //   rework_date: batch.rework_date,
      //   est_pick_replace:(batch.hmi1_bad+batch.hmi2_bad)-batch.scrap*10-batch.applied_labels,
      //   applied_labels: batch.applied_labels,
      //   rework_time: new Date(batch.rework_date.getDate() - batch.end_date.getDate())
      // } as DataPageDisplayData)
      //console.log(this.displayDataList.pop().end_date.getDate() - this.displayDataList.pop().start_date.getDate());
      // console.log(this.displayDataList.pop().end_date);
      // console.log(this.displayDataList);
      //console.log(this.displayDataList.pop().start_date);
      // console.log(batch);



    })
    this.hasValues = true
  }

  goBack() {
    this.location.back()
  }
}

