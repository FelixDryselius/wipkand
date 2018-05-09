import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

// Application imports
import { AuthAPIService } from '../auth/auth.service';
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
export class BatchHistoryDetailComponent implements OnInit, OnDestroy {
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
    private authAPI: AuthAPIService,
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
      batch_number: [],
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

    this.batchSub = this.operationsService.getBatchDetail(this.batchDetailID)
      .switchMap(data => {
        let batch = data as Batch
        let orderNumber = batch.order_number.order_number
        this.batchDetailForm.patchValue(batch)
        return this.operationsService.getOrder(orderNumber)
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.order = data as Order
        this.orderDetailForm.patchValue(data)
      })

    this.productSub = this.operationsService.getProduct()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.products = (data as QueryResponse).results
      })

    this.commentSub = this.commentService.getComment(this.batchDetailID)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.comments = (data as QueryResponse).results
      })

    this.statisticsSub = this.operationsService.getProductionStatistics('?search=' + this.batchDetailID + '&limit=40')
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.statistics = (data as QueryResponse).results        
      })
  }

  ngOnDestroy() {
    this.batchSub.unsubscribe()
    this.productSub.unsubscribe()
    this.commentSub.unsubscribe()
    this.statisticsSub.unsubscribe()
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
      form['order_number'] = this.order
      batch = form
    }
    this.operationsService.updateBatch(batch as Batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        let updatedBatch = data as Batch
        this.order = updatedBatch.order_number
        this.batchDetailID = (data as Batch).batch_number
      })
  }

  submitOrderDetails($theEvent, orderForm) {
    this.operationsService.updateOrder(orderForm)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe()
  }
  goBack() {
    this.location.back()
  }

}

