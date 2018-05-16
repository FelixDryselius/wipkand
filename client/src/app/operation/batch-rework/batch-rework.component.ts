import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FinishBatchComponent } from '../finish-batch/finish-batch.component';
import { Batch } from '../../shared/interfaces/batch';

@Component({
  selector: 'batch-rework',
  templateUrl: './batch-rework.component.html',
  styleUrls: ['./batch-rework.component.css']
})
export class BatchReworkComponent implements OnInit {
  @Input() reworkForm: FormGroup;

  constructor() { }

  ngOnInit() {
    if (this.reworkForm.controls.hmi1_total_rework) {
      this.reworkForm.controls.hmi1_total_rework.enable()
      this.reworkForm.controls.hmi1_good_rework.enable()
      this.reworkForm.controls.hmi1_bad_rework.enable()

      this.reworkForm.controls.hmi2_total_rework.enable()
      this.reworkForm.controls.hmi2_good_rework.enable()
      this.reworkForm.controls.hmi2_bad_rework.enable()
    } else {
      this.reworkForm.addControl('hmi1_total_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))
      this.reworkForm.addControl('hmi1_good_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))
      this.reworkForm.addControl('hmi1_bad_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))

      this.reworkForm.addControl('hmi2_total_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))
      this.reworkForm.addControl('hmi2_good_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))
      this.reworkForm.addControl('hmi2_bad_rework', new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))
    }
  }

  ngOnDestroy(): void {
    if (this.reworkForm.controls.hmi1_total_rework) {
      this.reworkForm.controls.hmi1_total_rework.disable()
      this.reworkForm.controls.hmi1_good_rework.disable()
      this.reworkForm.controls.hmi1_bad_rework.disable()

      this.reworkForm.controls.hmi2_total_rework.disable()
      this.reworkForm.controls.hmi2_good_rework.disable()
      this.reworkForm.controls.hmi2_bad_rework.disable()
    }
  }

  test() {
    console.log("It Works!");
  }

  getAppliedLabels() {
    return this.reworkForm.controls.hmi1_total_rework.value + this.reworkForm.controls.hmi2_total_rework.value
  }

  getPickAndReplace(form: Batch, applied_labels: number, scrap: number): number {
    if (applied_labels) {
      return ((form.hmi1_bad + form.hmi2_bad)
        - applied_labels
        - (scrap * 10))
    }
    return 0
  }
}
