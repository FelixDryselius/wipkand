import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common'

//3rd part and application imports
import { Batch } from '../shared/interfaces/batch';
import { OperationsService } from '../operation/shared/services/operations.service'
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-batch-history-detail',
  templateUrl: './batch-history-detail.component.html',
  styleUrls: ['./batch-history-detail.component.css']
})
export class BatchHistoryDetailComponent implements OnInit {
  batchDetail: Batch; // might not need
  batchDetailForm: FormGroup;
  batchDetailID: string;
  batchObservable: Observable<any>;
  batchSubscribe: any;
  getBatchDetailSub: any; // might not need


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private operationsService: OperationsService,
  ) { }

  ngOnInit() {
    this.batchDetailID = this.route.snapshot.paramMap.get('id')

    // this.getBatchDetailSub = this.operationsService.getBatchDetail(this.batchDetailID + '/').subscribe(data => {
    //   this.batchDetail = data as Batch
    //   console.log(this.batchDetail)
    //})


    //TODO: MAKE THIS PAGE GREAT AND REMOVE COMMENTS ETC. MORE INFO ON:
    // https://coryrylan.com/blog/using-angular-forms-with-async-data

    this.batchDetailForm = this.formBuilder.group({
      batch_number: [],
      start_date:  [],
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
      order_number: [],
    })

    // this.batchObservable = this.operationsService.getBatchDetail(this.batchDetailID + '/').pipe(
    //   tap(batch =>this.batchDetailForm.patchValue(batch)
    //   //console.log("this is batch-hist-detail: "+ batch)
    //   ))
    this.batchObservable = this.operationsService.getBatchDetail(this.batchDetailID + '/')
    this.batchSubscribe = this.batchObservable.subscribe(batch =>{
      this.batchDetailForm.patchValue(batch)
      console.log("this is batch-hist-detail: "+ batch) 
    })

    // this.getBatchDetailSub = this.operationsService.getBatchDetail(this.batchDetailID + '/').subscribe(data => this.batchDetail = {
    //   batch_number: data['batch_number'],
    //   start_date:  data['start_date'] as Date,
    //   end_date:  data['end_date'] as Date,
    //   scrap: data['scrap'],
    //   production_yield: data['production_yield'],
    //   hmi1_good: data['hmi1_good'],
    //   hmi1_bad: data['hmi1_bad'],
    //   hmi2_good: data['hmi2_good'],
    //   hmi2_bad: data['hmi2_bad'],
    //   rework_date: data['rework_date'] as Date,
    //   applied_labels: data['applied_labels'],
    //   label_print_time: data['label_print_time'],
    //   rework_time: data['rework_time'],
    //   order_number: data[' order_number'],
    // }
    // );
  }

  submitBatchDetails() {
    //This is the function that will handle changes to batch details
  }

  goBack() {
    this.location.back()
  }

}

