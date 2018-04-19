import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// 3rd party and application imports:
import { OperationsService } from '../../operations.service';

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
  private prodActive: boolean;
  private prodInfo: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  
  constructor(private router: Router, private operationsService: OperationsService) { }

  ngOnInit() {  
    //the following items are copied from start-batch.component
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
  }
  
  // TODO: get a correct unsubscribe working
  ngOnDestroy() {
    // this.service_prodStatus.unsubscribe()
    // this.service_prodInfo.unsubscribe()
  }

  submitEndBatch($theEvent,batchForm){  
    // TODO:  add these attributes so the whole batch kan close:
    // scrap, rework_date, applied_labels, label_print_time, rework_time, yield_2
    let batchInfo = {}
    console.log("submit end runned");
    if(this.prodActive){ 
      batchInfo = {
        batch_number: this.prodInfo.batch_number,
        end_date: new Date(),
        yield_1: batchForm.yield_1,
        hmi1_bad: batchForm.hmi1_bad,
        hmi2_bad: batchForm.hmi2_bad,
        hmi1_good: batchForm.hmi1_good,
        hmi2_good: batchForm.hmi2_good,
      } 
      this.operationsService.updateBatch(batchInfo).subscribe() 
    }
    
    this.operationsService.changeProdStatus(false) 
    this.operationsService.changeProdInfo(null)

    this.router.navigate(['/home'])
  }
}