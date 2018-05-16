import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FinishBatchComponent } from '../finish-batch/finish-batch.component';

@Component({
  selector: 'batch-rework',
  templateUrl: './batch-rework.component.html',
  styleUrls: ['./batch-rework.component.css']
})
export class BatchReworkComponent implements OnInit {
  @Input() reworkForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.reworkForm.addControl('hmi1Good_rework', new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]))
    this.reworkForm.addControl('hmi1Bad_rework', new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]))
    this.reworkForm.addControl('hmi2Good_rework', new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]))
    this.reworkForm.addControl('hmi2Bad_rework', new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]))
  }


}
