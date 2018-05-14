import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { tap } from 'rxjs/operators';


// Application imports
import { AuthAPIService } from '../auth/auth.service';
import { Batch } from '../shared/interfaces/batch';
import { CommentService } from '../shared/application-services/comment.service';
import { CustomValidation } from '../shared/validators/customValidation'
import { OperationsService } from '../operation/shared/services/operations.service';
import { QueryResponse } from '../shared/interfaces/query-response';
import { Order } from '../shared/interfaces/order';

@Component({
  selector: 'app-batch-history-detail',
  templateUrl: './batch-history-detail.component.html',
  styleUrls: ['./batch-history-detail.component.css']
})
export class BatchHistoryDetailComponent implements OnInit, OnDestroy {

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

  private currentBatch: Batch;
  comments: {};
  statistics: {};
  products: {};
  order: Order;



  private prodInfo: {}
  private service_prodInfo: any;

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
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

    this.createOrderForm()
    this.createBatchForm()

    this.batchSub = this.operationsService.getBatchDetail(this.batchDetailID)
      .mergeMap(data => {
        let batch = data as Batch
        this.currentBatch = data.batch_number
        let orderNumber = batch.order.order_number
        this.batchDetailForm.patchValue(batch)
        return Observable.forkJoin(
          this.operationsService.getOrder(orderNumber)
            .map(data => {
              this.order = data as Order
              this.orderDetailForm.patchValue(data as Order)
            }),
          this.commentService.getComment('?batch_number=' + this.currentBatch + '&limit=40')
            .map(data => {
              this.comments = (data as QueryResponse).results
            }),
          this.operationsService.getProductionStatistics('?batch_number=' + this.currentBatch + '&limit=40')
            .map(data => {
              this.statistics = (data as QueryResponse).results
            })
        )
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe()

    this.productSub = this.operationsService.getProduct()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.products = (data as QueryResponse).results
      })
  }

  ngOnDestroy() {
    if (this.batchSub) {
      this.batchSub.unsubscribe()
    }
    if (this.productSub) {
      this.productSub.unsubscribe()
    }
    if (this.service_prodInfo) {
      this.service_prodInfo.unsubscribe()
    }
  }

  createOrderForm() {
    this.orderDetailForm = this.formBuilder.group({
      'order_number': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        CustomValidation.checkLimit(1000000, 9999999),
      ]),
      'article_number': new FormControl(this.products, [
        Validators.required
      ])
    })
  }

  createBatchForm() {
    this.batchDetailForm = this.formBuilder.group({
      'batch_number': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        CustomValidation.checkLimit(1000000000, 9999999999),
      ]),
      'start_date': new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]-[0-9]+[0-9]-[0-9]+[0-9]T[0-9]+[0-9]:[0-9]+[0-9]:[0-9]+[0-9](.*)"),
      ]),
      'end_date': new FormControl('', [
        Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]-[0-9]+[0-9]-[0-9]+[0-9]T[0-9]+[0-9]:[0-9]+[0-9]:[0-9]+[0-9](.*)"),
      ]),
      'scrap': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'production_yield': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1_good': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1_bad': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_good': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_bad': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'rework_date': new FormControl('', [
        Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]-[0-9]+[0-9]-[0-9]+[0-9]T[0-9]+[0-9]:[0-9]+[0-9]:[0-9]+[0-9](.*)"),
      ]),
      'applied_labels': new FormControl('', [
        //Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'label_print_time': new FormControl('', [
        Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]-[0-9]+[0-9]-[0-9]+[0-9]T[0-9]+[0-9]:[0-9]+[0-9]:[0-9]+[0-9](.*)"),
      ]),
      'rework_time': new FormControl('', [
        Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]-[0-9]+[0-9]-[0-9]+[0-9]T[0-9]+[0-9]:[0-9]+[0-9]:[0-9]+[0-9](.*)"),
      ]),
    })
  }

  // convertDates(form) {
  //   if (form['start_date']) {
  //     form['start_date'] = new Date(form['start_date']).toISOString()
  //   }
  //   if (form['end_date']) {
  //     form['end_date'] = new Date(form['end_date']).toISOString()
  //   }
  //   if (form['rework_date']) {
  //     form['rework_date'] = new Date(form['rework_date']).toISOString()
  //   }
  //   if (form['label_print_time']) {
  //     form['label_print_time'] = new Date(form['label_print_time']).toISOString()
  //   }
  // }

  submitFormDetails($theEvent, form) {
    let batch;
    if (form['order_number']) {
      batch = {
        order: {
          order_number: form['order_number'],
          article_number: form['article_number'],
        },
        id: this.batchDetailID,
        batch_number: this.currentBatch
      }
    } else {
      form['order'] = this.order
      form['id'] = this.batchDetailID
      //this.convertDates(form)
      batch = form
    }
    this.operationsService.updateBatch(batch as Batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        let updatedBatch = data as Batch
        if (this.prodInfo) {
          if ((this.prodInfo['batch_number'] == this.currentBatch) &&
            (this.currentBatch.batch_number != updatedBatch.batch_number ||
              this.order != updatedBatch.order)) {
            this.operationsService.setCurrentBatchInfo(updatedBatch)
          }
        }
        this.currentBatch = updatedBatch
        this.order = updatedBatch.order
        this.batchDetailID = (data as Batch).id
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

