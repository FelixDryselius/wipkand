import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { OperationsService } from '../../shared/application-services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response'
import { BatchReworkComponent } from '../batch-rework/batch-rework.component';

// 3rd party imports

@Component({
  selector: 'app-finish-batch',
  templateUrl: './finish-batch.component.html',
  styleUrls: ['./finish-batch.component.css']
})
export class FinishBatchComponent implements OnInit {

  @ViewChild(BatchReworkComponent) batchReworkComponent: BatchReworkComponent

  private prodInfo: any;
  private service_prodInfoSub: any;
  private createBatchSub: any;
  private getProductSub: any;

  currentProduct: any;
  finishBatchForm: FormGroup;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.service_prodInfoSub = this.operationsService.$prodInfo.subscribe(info => this.prodInfo = info)
    if (this.prodInfo) {
      this.getProductSub = this.operationsService.getProduct(this.prodInfo.order.article_number)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => {
          this.currentProduct = data
        })
    }

    this.createFinishBatchForm()
  }

  // TODO: get a correct unsubscribe working
  ngOnDestroy() {
    this.service_prodInfoSub.unsubscribe()
  }

  calculateScrap(form: Batch, refLagerQuantity: number): number {
    let scrap = Math.ceil(((
      (form.hmi1_good + form.hmi1_bad + form.hmi2_good + form.hmi2_bad)
      - (form.production_yield * 10)) / 10)
      - refLagerQuantity
    )
    return scrap
    //return scrap > 0 ? scrap: 0
  }

  createFinishBatchForm() {
    this.finishBatchForm = this.formBuilder.group({
      'hmi1_good': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1_bad': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_good': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2_bad': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'production_yield': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
    })
  }

  submitEndBatch($theEvent, form) {
    let batch: Batch = {
      id: this.prodInfo.id,
      is_active: 0,
      batch_number: this.prodInfo.batch_number,
      order: this.prodInfo.order,
      end_date: new Date(),
      scrap: this.calculateScrap(form, this.currentProduct.reference_storage),
      production_yield: form.production_yield,
      hmi1_good: form.hmi1_good,
      hmi1_bad: form.hmi1_bad,
      hmi2_good: form.hmi2_good,
      hmi2_bad: form.hmi2_bad,
    }

    this.createBatchSub = this.operationsService.updateBatch(batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.operationsService.setCurrentBatchInfo(null);
        this.createBatchSub.unsubscribe()
        this.router.navigate(['operation/operations'])
      }
      )
  }
}