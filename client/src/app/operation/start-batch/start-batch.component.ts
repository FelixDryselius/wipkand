import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Batch } from '../../shared/interfaces/batch';
import { SubmitIfValidDirective } from '../../shared/directives/submit-if-valid.directive';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/validators/customValidation'

@Component({
  selector: 'app-start-batch',
  //directivesx: [SubmitIfValidDirective],
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})

export class StartBatchComponent implements OnInit, OnDestroy {
  private prodInfo: {};
  private batch: string;
  private order: string;
  private article: string;
  private batchStartDate: Date;

  private createBatchSub: any;
  private getProductSub: any;
  private service_prodInfo: any;

  prodData: any[];

  newBatchForm: FormGroup;
  batchErrorMsg: string;
  orderErrorMsg: string;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.service_prodInfo = this.operationsService.$prodInfo.subscribe(info => this.prodInfo = info)

    this.getProductSub = this.operationsService.getProduct()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.prodData = (data as QueryResponse).results as any[]
      })

    this.newBatchForm = this.formBuilder.group({
      'orderNumber': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        CustomValidation.checkLimit(1000000, 9999999),
      ]),
      'articleNumber': new FormControl('', [Validators.required]),
      'batchNumber': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        CustomValidation.checkLimit(1000000000, 9999999999),
      ]),
    })
  }

  //BUG? - If we unsubscribe to the service, will the info still be updated?
  ngOnDestroy() {
    //These are causing bugs with posts. How to unsubscribe from HTTP posts?
    //this.req_order.unsubscribe()
    //this.req_batch.unsubscribe()
    this.getProductSub.unsubscribe()
    this.service_prodInfo.unsubscribe()
  }


  submitBatch(event, formData) {
    //TODO: Do we really need to store these values in the class? 
    this.batch = formData.value['batchNumber'];
    this.order = formData.value['orderNumber'];
    this.article = formData.value['articleNumber'];
    this.batchStartDate = new Date();

    let newBatch = {
      batch_number: this.batch,
      order: {
        order_number: this.order,
        article_number: this.article,
      },
      start_date: this.batchStartDate,
      shifts: 3,
    }

    this.batchErrorMsg = null;
    this.orderErrorMsg = null;
    this.createBatchSub = this.operationsService.createBatch(newBatch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.operationsService.setCurrentBatchInfo(data as Batch);
        this.router.navigate(['/operation/operations'])
        this.createBatchSub.unsubscribe()
      }, 
      
        error => {
          console.error(error)
          if (error.error.batch_number) {
            this.batchErrorMsg = error.error.batch_number;
          }
          if (error.error.order_number) {
            this.orderErrorMsg = error.error.order_number;
          }
        });
  }
}

