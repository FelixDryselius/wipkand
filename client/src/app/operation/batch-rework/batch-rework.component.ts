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
    console.log("Init");
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
    console.log("Destroy");

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

  getPickAndReplace(batchData: Batch, applied_labels: number, scrap: number): number {
    if (applied_labels) {
      return ((batchData.hmi1_bad + batchData.hmi2_bad)
        - applied_labels
        - (scrap * 10))
    }
    return 0
  }

  milisecondsToTimeString(miliseconds: number) {
    if (miliseconds) {
      let raw_sec = Math.floor(miliseconds / 1000);
      let hours = Math.floor(raw_sec / 3600);
      let minutes = Math.floor((raw_sec - (hours * 3600)) / 60);
      let seconds = raw_sec - (hours * 3600) - (minutes * 60);

      let str_hours: string;
      if (hours < 10) {
        str_hours = "0" + hours;
      } else {
        str_hours = hours.toString()
      }

      let str_minutes: string;
      if (minutes < 10) {
        str_minutes = "0" + minutes;
      } else {
        str_minutes = minutes.toString()
      }

      let str_seconds: string;
      if (seconds < 10) {
        str_seconds = "0" + seconds;
      } else {
        str_seconds = seconds.toString()
      }
      return str_hours + ':' + str_minutes + ':' + str_seconds;
    } else {
      return null
    }
  }

}
