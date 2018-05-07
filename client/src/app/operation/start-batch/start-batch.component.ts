import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { OperationsService } from '../shared/services/operations.service';
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
  private prodActive: boolean;
  private prodInfo: {};
  private batch: string;
  private order: string;
  private article: string;
  private batchStartDate: Date;

  private req_batch: any;
  private req_order: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  //What is this below?
  newBatch: number;
  prodData: any[];

  readonly ROOT_URL = 'http://localhost:8000/api/operations/product/'

  newBatchForm: FormGroup;


  @Input()
  passedQuery: number;
  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private http: HttpClient,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    //Use operationsService to share information between start-batch, finish-batch and current-batch-info
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

    //TODO: There should be no HTTP calls in components. Move to service
    this.http.get(this.ROOT_URL)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.prodData = (data as QueryResponse).results as any[];		// FILL THE ARRAY WITH DATA.
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
  test() {
    console.log(this.newBatchForm);
  }

  //BUG? - If we unsubscribe to the service, will the info still be updated?
  ngOnDestroy() {
    //These are causing bugs with posts. How to unsubscribe from HTTP posts?
    //this.req_order.unsubscribe()
    //this.req_batch.unsubscribe()
    //this.service_prodStatus.unsubscribe()
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
      order_number: {
        order_number: this.order,
        article_number: this.article,
      },
      start_date: this.batchStartDate
    }

    this.req_batch = this.operationsService.createBatch(newBatch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe();
    this.router.navigate(['/home'])
  }
}

