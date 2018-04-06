import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-batch',
  templateUrl: './finish-batch.component.html',
  styleUrls: ['./finish-batch.component.css']
})
export class FinishBatchComponent implements OnInit {
title = "Finish batch";
groninger1 = "Final HMI Data Groninger 1";
groninger2 = "Final HMI Data Groninger 2";

  constructor() { }

  ngOnInit() {
  }

}
