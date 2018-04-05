import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-batch',
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})

export class StartBatchComponent implements OnInit {
  newBatch: number;
  newOrder: number;
  newProduct: any;

  title = "Start new batch";

  constructor(private router: Router) {   
      }

  ngOnInit() {
  }

  submitBatch(event, formData) {
    let chosenBatch = formData.value['batchnr']
    let chosenOrder = formData.value['ordernr']
    
    console.log("batch number: " + chosenBatch)
    console.log("order number: " + chosenOrder)

    
  }

}
