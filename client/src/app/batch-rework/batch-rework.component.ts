import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-rework',
  templateUrl: './batch-rework.component.html',
  styleUrls: ['./batch-rework.component.css']
})
export class BatchReworkComponent implements OnInit {
title = "Rework batch";
groninger1 = "Final HMI Data Groninger 1";
groninger2 = "Final HMI Data Groninger 2";

  constructor() { }

  ngOnInit() {
  }

}
