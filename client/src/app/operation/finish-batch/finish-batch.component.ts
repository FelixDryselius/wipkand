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
  title = "Finish batch";
  groninger1 = "Final HMI Data Groninger 1";
  groninger2 = "Final HMI Data Groninger 2";
  reLabeling = "false" //making the radio button "no" checked default 

  //the following items are copied from start-batch.component

  private prodInfo: any;
  private service_prodInfo: any;

  private finishBatchForm: FormGroup;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private authAPI: AuthAPIService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //the following items are copied from start-batch.component

    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
    this.createFinishBatchForm()

  }

  // TODO: get a correct unsubscribe working
  ngOnDestroy() {
    // this.service_prodInfo.unsubscribe()
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
      'reLabeling': new FormControl('', [
        Validators.required,
      ]),
    })
  }

  submitEndBatch($theEvent, batchForm) {
    // TODO:  add these attributes so the whole batch kan close:
    // scrap, rework_date, applied_labels, label_print_time, rework_time, yield_2
    let batchInfo = {}
    if (this.prodInfo.active) {
      batchInfo = {
        batch_number: this.prodInfo.batch_number,
        order_number: {
          order_number: this.prodInfo.order_number,
          article_number: this.prodInfo.article_number,
        },
        end_date: new Date(),
        production_yield: batchForm.yield,
        hmi1_good: batchForm.hmi1Good,
        hmi1_bad: batchForm.hmi1Bad,

        hmi2_good: batchForm.hmi2Good,
        hmi2_bad: batchForm.hmi2Bad,
      }
      console.log(batchInfo)
      this.operationsService.updateBatch(batchInfo as Batch)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => {
          this.operationsService.setCurrentBatchInfo(null);
          this.router.navigate(['/home'])
        }, error => {
          console.error(error.message)
        })
    }
    
  }
}