import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { OperationsService } from '../shared/services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response'

// 3rd party imports

@Component({
  selector: 'app-finish-batch',
  templateUrl: './finish-batch.component.html',
  styleUrls: ['./finish-batch.component.css']
})
export class FinishBatchComponent implements OnInit {

  private prodInfo: any;
  private service_prodInfoSub: any;
  private createBatchSub: any;

  private finishBatchForm: FormGroup;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.service_prodInfoSub = this.operationsService.$prodInfo.subscribe(info => this.prodInfo = info)
    this.createFinishBatchForm()
  }

  // TODO: get a correct unsubscribe working
  ngOnDestroy() {
    this.service_prodInfoSub.unsubscribe()
  }

  createFinishBatchForm() {
    this.finishBatchForm = this.formBuilder.group({
      'hmi1Good': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi1Bad': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2Good': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'hmi2Bad': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'yield': new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'rework': new FormControl('', [
        Validators.required,
      ]),
    })
  }

  disableReworkForm() {
    if (this.finishBatchForm.controls.hmi1Bad_rework) {
      this.finishBatchForm.controls.hmi1Bad_rework.disable()
      this.finishBatchForm.controls.hmi2Bad_rework.disable()
      this.finishBatchForm.controls.hmi1Good_rework.disable()
      this.finishBatchForm.controls.hmi2Good_rework.disable()
    }
  }

  enableReworkForm() {
    if (this.finishBatchForm.controls.hmi1Bad_rework) {
      this.finishBatchForm.controls.hmi1Bad_rework.enable()
      this.finishBatchForm.controls.hmi2Bad_rework.enable()
      this.finishBatchForm.controls.hmi1Good_rework.enable()
      this.finishBatchForm.controls.hmi2Good_rework.enable()
    }
  }

  submitEndBatch($theEvent, batchForm) {
    // TODO:  add these attributes so the whole batch kan close:
    // scrap, rework_date, applied_labels, label_print_time, rework_time, yield_2
    let batchInfo = {}
    if (this.prodInfo) {
      batchInfo = {
        id: this.prodInfo.id,
        batch_number: this.prodInfo.batch_number,
        order: this.prodInfo.order,
        end_date: new Date(),
        production_yield: batchForm.yield,
        hmi1_good: batchForm.hmi1Good,
        hmi1_bad: batchForm.hmi1Bad,
        hmi2_good: batchForm.hmi2Good,
        hmi2_bad: batchForm.hmi2Bad,
      }
      console.log(batchInfo)
      this.createBatchSub = this.operationsService.updateBatch(batchInfo as Batch)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => {
          this.operationsService.setCurrentBatchInfo(null);
          this.createBatchSub.unsubscribe()
          this.router.navigate([''])

        }
          // , error => {
          //   console.error(error.message)
          // }
        )
    }
  }
}