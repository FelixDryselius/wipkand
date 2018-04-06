import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-batch',
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})

export class StartBatchComponent implements OnInit {
  newBatch: number;

  title = "Start new batch";

  @Input()
  passedQuery: number;

  constructor(private router: Router) {   
      }

  ngOnInit() {
    console.log(this.passedQuery)
    if(this.passedQuery) {
      this.newBatch = this.passedQuery
    }
  }

  submitBatch(event, formData) {
    let chosenBatch = formData.value['batchnr']
    let chosenOrder = formData.value['ordernr']
    console.log("chosenBatch: " + chosenBatch)
    console.log("chosenOrder: " + chosenOrder)

    if (chosenBatch && chosenOrder) {
      console.log("sent item" + {batchnr: formData.value['batchnr'], 
      ordernr: formData.value['ordernr']} );
      
      this.router.navigate(['running-batch', 
      {batchnr: formData.value['batchnr'], 
      ordernr: formData.value['ordernr']}, 
      
    ])
    }
    
  }

}

