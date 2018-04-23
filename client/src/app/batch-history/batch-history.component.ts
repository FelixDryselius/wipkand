import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operation/shared/services/operations.service'
import { Batch } from '../shared/interfaces/batch';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batch-history',
  templateUrl: './batch-history.component.html',
  styleUrls: ['./batch-history.component.css']
})
export class BatchHistoryComponent implements OnInit {
  batches: [Batch]

  getBatchesSub: any;

  constructor(
    private operationsService: OperationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBatchesSub = this.operationsService.getBatchList().subscribe(data => {
      this.batches = data as [Batch]
      console.log(this.batches)
    })
    }

  toBatchDetail(id) {
    this.router.navigate(['batch-history/' + id + '/'])
  }

}
