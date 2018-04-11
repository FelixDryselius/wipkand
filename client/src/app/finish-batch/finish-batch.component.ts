import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Batch } from '../../assets/interface/batch';

@Component({
  selector: 'app-finish-batch',
  templateUrl: './finish-batch.component.html',
  styleUrls: ['./finish-batch.component.css']
})
export class FinishBatchComponent implements OnInit {
  title = "Finish batch";
  groninger1 = "Final HMI Data Groninger 1";
  groninger2 = "Final HMI Data Groninger 2";

  batchInfo = {} as any;

  reLabeling = "false" //making the radio button "no" checked default 
  constructor() { }

  ngOnInit() {
    this.batchInfo = {
    batch_number: "1111",
    start_date: "maj",
    end_date: "augusti",
    scrap: 0,
    yield_1: 0,
    hmi1_good: 0,
    hmi1_bad: 0,
    hmi2_good: 0,
    hmi2_bad: 0,
    rework_date: "oktober",
    applied_labels: 0,
    label_print_time: "tjugo min",
    rework_time: "trettio min",
    yield_2: 0,
    order_number: 12
    } as Batch
  }

  submitEndBatch($theEvent,batchForm){  
  
    this.batchInfo.hmi1_bad = batchForm.hmi1_bad
    this.batchInfo.hmi2_bad = batchForm.hmi2_bad
    this.batchInfo.hmi1_good = batchForm.hmi1_good
    this.batchInfo.hmi2_good = batchForm.hmi2_good
    this.batchInfo.yield_1 = batchForm.yield_1
    // this.batchInfo.hmi2_bad = 0
    // this.batchInfo.hmi1_good = 0
    // this.batchInfo.hmi2_good = 0
    // this.batchInfo.yield_1 = 0
  }

  saveEmployee(empForm:NgForm):void {
    console.log(empForm);
    
  }
}
