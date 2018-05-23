import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { tap } from 'rxjs/operators';


// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { BatchReworkComponent } from '../batch-rework/batch-rework.component';
import { CommentService } from '../../shared/application-services/comment.service';
import { CustomValidation } from '../../shared/validators/customValidation'
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Order } from '../../shared/interfaces/order';

//Third party imports
import { CalendarModule } from 'primeng/calendar';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-batch-history-detail',
  templateUrl: './batch-history-detail.component.html',
  styleUrls: ['./batch-history-detail.component.css']
})
export class BatchHistoryDetailComponent implements OnInit, OnDestroy {

  @ViewChild(BatchReworkComponent) batchReworkComponent: BatchReworkComponent

  private batchDetailForm: FormGroup;
  batchFormActive: boolean = false;
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
  orderFormActive: boolean = false;

  private productObservable: Observable<any>;
  private productSub: any;

  private modal: NgbModalRef

  currentBatch: Batch;
  comments: {};
  statistics: {};
  products: {};
  order: Order;

  updateBatchSuccess: boolean;
  updateOrderSuccess: boolean;
  reworkSuccess: boolean;
  updateError: any;
  updateErrorKeys: any;

  serverError: any;

  reworking: boolean;
  reworkForm: FormGroup;

  private prodInfo: {}
  private service_prodInfo: any;

  constructor(
    private authAPI: AuthAPIService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private operationsService: OperationsService,
    private commentService: CommentService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.batchDetailID = this.route.snapshot.paramMap.get('id')
    this.service_prodInfo = this.operationsService.$prodInfo.subscribe(info => this.prodInfo = info)

    this.createOrderForm()
    this.createBatchForm()

    this.batchSub = this.operationsService.getBatch(this.batchDetailID)
      .mergeMap(data => {
        this.currentBatch = data as Batch
        this.stringToDate(this.currentBatch)
        this.batchDetailForm.patchValue(this.currentBatch)
        return Observable.forkJoin(
          this.operationsService.getOrder(this.currentBatch.order.order_number)
            .map(data => {
              this.order = data as Order
              this.orderDetailForm.patchValue(data as Order)
            }),
          this.commentService.getComment('?batch_number=' + this.currentBatch.batch_number + '&limit=40')
            .map(data => {
              this.comments = (data as QueryResponse).results
            }),
          this.operationsService.getProductionStatistics('?batch_number=' + this.currentBatch.batch_number + '&limit=40')
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
    this.clearMsg()
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
    this.orderDetailForm.disable()
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
      ]),
      'end_date': new FormControl('', [
      ]),
      'scrap': new FormControl('', [
      ]),
      'production_yield': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1_good': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1_bad': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_good': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_bad': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      'rework_date': new FormControl('', [
      ]),
      'applied_labels': new FormControl('', [
        Validators.pattern("^[0-9]*$"),
      ]),
      // 'label_print_time': new FormControl('', [
      // ]),
      // 'rework_time': new FormControl('', [
      // ]),
    })
    this.batchDetailForm.disable()
  }

  stringToDate(batch: Batch) {
    if (batch.start_date) {
      batch.start_date = new Date(batch.start_date)
    }
    if (batch.end_date) {
      batch.end_date = new Date(batch.end_date)
    }
    if (batch.rework_date) {
      batch.rework_date = new Date(batch.rework_date)
    }
    if (batch.label_print_time) {
      batch.label_print_time = new Date(batch.label_print_time)
    }
  }

  submitOrderForm($event, form) {
    let batch = {
      order: {
        order_number: form['order_number'],
        article_number: form['article_number'],
      },
      id: this.currentBatch.id,
      batch_number: this.currentBatch.batch_number
    }
    this.clearMsg()
    this.orderFormActive = false;
    this.orderDetailForm.disable();
    this.operationsService.updateBatch(batch as Batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.updateOrderSuccess = true
        this.handleUpdateBatch(data as Batch)
      },
        error => {
          this.updateOrderSuccess = false
          this.batchDetailForm.patchValue(this.currentBatch)
          this.handleUpdateError(error)
        })
  }

  submitBatchForm($event, form) {
    form['order'] = this.order
    form['id'] = this.batchDetailID
    if (form['rework_time'] == '') {
      form['rework_time'] = null
    }
    this.clearMsg()
    this.batchFormActive = false;
    this.batchDetailForm.disable();
    this.operationsService.updateBatch(form as Batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.updateBatchSuccess = true
        this.handleUpdateBatch(data as Batch)
      },
        error => {
          this.updateBatchSuccess = false
          this.batchDetailForm.patchValue(this.currentBatch)
          this.handleUpdateError(error)
        }
      )
  }

  submitRework($event, reworkForm) {
    let _label_print_time = new Date()
    let _applied_labels = this.batchReworkComponent.getAppliedLabels()
    let _pick_and_replace = this.batchReworkComponent.getPickAndReplace(this.currentBatch, _applied_labels, this.currentBatch.scrap)

    let batch: Batch = {
      id: this.currentBatch.id,
      batch_number: this.currentBatch.batch_number,
      order: this.currentBatch.order,
      applied_labels: _applied_labels,
      rework_date: new Date(),
    }
    if (this.modal) {
      this.modal.close()
    }
    this.setRework(false)
    this.clearMsg()
    this.operationsService.updateBatch(batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe((data: Batch) => {
        this.currentBatch = data
        this.stringToDate(this.currentBatch)
        this.reworkSuccess = true
        this.batchDetailForm.patchValue(this.currentBatch)
      },
        error => {
          this.reworkSuccess = false
          this.handleUpdateError(error)
        }
      )

  }

  checkCurrentBatchChange(batch: Batch): boolean {
    if (this.prodInfo) {
      if ((this.prodInfo['batch_number'] == this.currentBatch.batch_number) &&
        (this.currentBatch.batch_number != batch.batch_number ||
          this.order != batch.order)) {
        return true
      }
    }
    return false
  }

  handleUpdateBatch(batch: Batch) {
    if (this.checkCurrentBatchChange(batch)) {
      this.operationsService.setCurrentBatchInfo(batch)
    }
    this.currentBatch = batch
    this.order = batch.order
    this.batchDetailID = (batch as Batch).id
  }

  handleUpdateError(error) {
    if (error.status == 500) {
      this.serverError = error
    }
    console.error(error)
    this.updateError = error.error;
    this.updateErrorKeys = [];
    for (let i = 0; i < Object.keys(error.error).length; i++) {
      this.updateErrorKeys.push(Object.keys(error.error)[i])
    }
  }

  clearMsg() {
    this.updateBatchSuccess = null;
    this.updateOrderSuccess = null;
    this.reworkSuccess = null;
    this.updateError = null;
    this.updateErrorKeys = null;
    this.serverError = null;
  }

  setRework(state: boolean) {
    if (state == true) {
      this.reworkForm = this.formBuilder.group({
      })
      this.reworking = true
    } else {
      this.reworking = false
    }
  }

  openModal(content) {
    this.modal = this.modalService.open(content, { size: 'lg' });
  }

  goBack() {
    this.location.back()
  }
}

