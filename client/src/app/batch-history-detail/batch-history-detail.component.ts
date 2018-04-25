import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Batch } from '../shared/interfaces/batch';
import { CommentService } from '../shared/application-services/comment.service';
import { OperationsService } from '../operation/shared/services/operations.service';
import { QueryResponse } from '../shared/interfaces/query-response';
import { Order } from '../shared/interfaces/order';

@Component({
  selector: 'app-batch-history-detail',
  templateUrl: './batch-history-detail.component.html',
  styleUrls: ['./batch-history-detail.component.css']
})
export class BatchHistoryDetailComponent implements OnInit {
  private batchDetail: Batch; // might not need
  private batchDetailForm: FormGroup;
  private batchDetailID: string;
  private batchObservable: Observable<any>;
  private batchSub: any;

  private commentObservable: Observable<any>;
  private commentSub: any;
  private statisticsObservable
  private statisticsSub

  private orderObservable: Observable<any>;
  private orderSub: any;
  private orderDetailForm: FormGroup;

  private productObservable: Observable<any>;
  private productSub: any;

  comments: {};
  statistics: {};
  products: {};
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private operationsService: OperationsService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {


    this.batchDetailID = this.route.snapshot.paramMap.get('id')

    //TODO: MAKE THIS PAGE GREAT AND REMOVE COMMENTS ETC. MORE INFO ON:
    // https://coryrylan.com/blog/using-angular-forms-with-async-data

    this.orderDetailForm = this.formBuilder.group({
      order_number: [],
      article_number: this.products,
    })

    this.batchDetailForm = this.formBuilder.group({
      start_date: [],
      end_date: [],
      scrap: [],
      production_yield: [],
      hmi1_good: [],
      hmi1_bad: [],
      hmi2_good: [],
      hmi2_bad: [],
      rework_date: [],
      applied_labels: [],
      label_print_time: [],
      rework_time: [],
    })

    this.batchObservable = this.operationsService.getBatchDetail(this.batchDetailID)
    this.batchSub = this.batchObservable.subscribe(data => {
      let batch = data as Batch
      let orderNumber = batch.order_number.order_number
      this.batchDetailForm.patchValue(batch)
      this.orderObservable = this.operationsService.getOrder(orderNumber)
      this.orderSub = this.orderObservable.subscribe(data => {
        console.log("Fetched order is: ")
        console.log(data)
        this.order = data
        this.orderDetailForm.patchValue(data)
      })
    })

    this.productObservable = this.operationsService.getProduct()
    this.productSub = this.productObservable.subscribe(data => {
      this.products = (data as QueryResponse).results
    })

    this.commentObservable = this.commentService.getComment(this.batchDetailID)
    this.commentSub = this.commentObservable.subscribe(data => {
      this.comments = (data as QueryResponse).results
    })

    let queryStatistics = '?search=' + this.batchDetailID + '&limit=40'
    this.statisticsObservable = this.operationsService.getProductionStatistics(queryStatistics)
    this.statisticsSub = this.statisticsObservable.subscribe(data => {
      this.statistics = (data as QueryResponse).results
      console.log(this.statistics)
    })
  }

  submitFormDetails($theEvent, form) {
    let batch;
    debugger;
    if (form['order_number']) {
      batch = {
        order_number: {
          order_number: form['order_number'],
          article_number: form['article_number'],
        },
        batch_number: this.batchDetailID
      }
    } else {
      form['batch_number'] = this.batchDetailID
      form['order_number'] = this.order
      batch = form
    }
    console.log(form)
    this.operationsService.updateBatch(batch as Batch).subscribe(data => {
      this.order = (data as Batch).order_number
      console.log("Order is now: ")
      console.log(this.order)
    })
  }

  submitOrderDetails($theEvent, orderForm) {
    console.log(orderForm)
    this.operationsService.updateOrder(orderForm).subscribe()
  }
  goBack() {
    this.location.back()
  }

}

