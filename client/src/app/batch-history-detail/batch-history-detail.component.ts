import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operation/shared/services/operations.service'
import { Batch } from '../shared/interfaces/batch';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-batch-history-detail',
  templateUrl: './batch-history-detail.component.html',
  styleUrls: ['./batch-history-detail.component.css']
})
export class BatchHistoryDetailComponent implements OnInit {
  batchDetail: Batch;
  batchDetailID: string;
  getBatchDetailSub: any;

  constructor(
    private operationsService: OperationsService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.batchDetailID = this.route.snapshot.paramMap.get('id')
    this.getBatchDetailSub = this.operationsService.getBatchDetail(this.batchDetailID + '/').subscribe(data => {
      this.batchDetail = data as Batch
      console.log(this.batchDetail)
    })
  }

  goBack() {
    this.location.back()
  }

}
