import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FinishBatchComponent } from '../finish-batch/finish-batch.component';

@Component({
  selector: 'batch-rework',
  templateUrl: './batch-rework.component.html',
  styleUrls: ['./batch-rework.component.css']
})
export class BatchReworkComponent implements OnInit {
//@Input() group: FormGroup;
@Input() test: string;

  constructor() { }

  ngOnInit() {
    console.log(this.test)
  }

}
