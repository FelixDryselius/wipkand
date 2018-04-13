import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OperationsService } from '../operations.service';

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

 //the following items are copied from start-batch.component
  private prodActive: boolean;
  private prodInfo: {};
  private service_prodStatus: any;
  private service_prodInfo: any;
  
  
  constructor( private operationsService: OperationsService) { }

  ngOnInit() {
    this.batchInfo = {
    batch_number: "1111",
    article_number:"",
    start_date: new Date('1995-12-17T03:24:00'),
    end_date: new Date('2005-12-17T03:24:00'),
    scrap: 0,
    yield_1: 0,
    hmi1_good: 0,
    hmi1_bad: 0,
    hmi2_good: 0,
    hmi2_bad: 0,
    rework_date: new Date('2005-12-17T12:24:00'),
    applied_labels: 0,
    label_print_time: 20,
    rework_time: 30,
    yield_2: 0,
    order_number: 12
    } as Batch
    
    //the following items are copied from start-batch.component
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

  }
  // can't get it to work
  ngOnDestroy() {
    // this.service_prodStatus.unsubscribe()
    // this.service_prodInfo.unsubscribe()
  }

  submitEndBatch($theEvent,batchForm){  

       
    if(this.prodActive){
      this.batchInfo.article_number = this.prodInfo["article"]      
      this.batchInfo.batch_number = this.prodInfo["batch"]
      this.batchInfo.order_number = this.prodInfo["order"]

      this.batchInfo.hmi1_bad = batchForm.hmi1_bad
      this.batchInfo.hmi2_bad = batchForm.hmi2_bad
      this.batchInfo.hmi1_good = batchForm.hmi1_good
      this.batchInfo.hmi2_good = batchForm.hmi2_good
      this.batchInfo.yield_1 = batchForm.yield_1

      this.operationsService.updateBatch (this.batchInfo).subscribe() 
      
    }



    
  }

  saveEmployee(empForm:NgForm):void {
    console.log(empForm);
    
  }
}
