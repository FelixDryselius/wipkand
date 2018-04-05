import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-batch',
  templateUrl: './start-batch.component.html',
  styleUrls: ['./start-batch.component.css']
})
export class StartBatchComponent implements OnInit {
  newBatch: any;

  constructor(private router: Router) { 
  }
  
  ngOnInit() {
  }

  submitBatch(event, formData) {
    let chosenBatch = formData.value['batchnr']
    if (chosenBatch) {
      this.router.navigate( ['/startbatch', {batchnr: formData.value['batchnr']}])
    }
    console.log(chosenBatch)
  }

}
