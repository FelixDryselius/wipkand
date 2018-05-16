import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { OperationsService } from '../shared/services/operations.service';
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

  private currentProduct: any;
  private finishBatchForm: FormGroup;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.service_prodInfoSub = this.operationsService.$prodInfo.subscribe(info => this.prodInfo = info)
    if (this.prodInfo) {
      console.log("Fetchng product");
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

  // fbTest() {
  //   this.batchReworkComponent.calculate()
  // }

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
      'rework': new FormControl('', [
        Validators.required,
      ]),
    })
  }

  submitEndBatch($theEvent, form) {
    let batch: Batch = {
      id: this.prodInfo.id,
      batch_number: this.prodInfo.batch_number,
      order: this.prodInfo.order,
      end_date: new Date(),
      scrap: this.calculateScrap(form, this.currentProduct.reference_storage),
      production_yield: form.production_yield,
      hmi1_good: form.hmi1Good,
      hmi1_bad: form.hmi1Bad,
      hmi2_good: form.hmi2Good,
      hmi2_bad: form.hmi2Bad,
    }

    if (form.rework == 'true') {
      //let _applied_labels = this.batchReworkComponent.getAppliedLabels()
      batch.applied_labels = this.batchReworkComponent.getAppliedLabels()
      let _pick_and_replace = this.batchReworkComponent.getPickAndReplace(form, batch.applied_labels, batch.scrap)
    }

    this.createBatchSub = this.operationsService.updateBatch(batch)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.operationsService.setCurrentBatchInfo(null);
        this.createBatchSub.unsubscribe()
        this.router.navigate([''])
      }
      )
  }
}