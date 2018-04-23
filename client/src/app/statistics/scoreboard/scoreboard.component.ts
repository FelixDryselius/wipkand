import { Component, OnInit } from '@angular/core';

// 3rd party and application imports
import { CommentService } from '../../shared/application-services/comment.service';
import { StatisticsService } from '../shared/services/statistics.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  productionStatisticsSubscribe: any; 
  productionStatistics: any;
  comments:any;

  constructor(private statisticsService: StatisticsService, private commentService:CommentService) { }

  ngOnInit() {
    let batchNumber = "1000000001" // this is a dummy number, will be implemented later
    this.productionStatisticsSubscribe = this.statisticsService.getStatistics(batchNumber).subscribe(data => {
      this.productionStatistics = data
    })
    this.getComment('12324')
  }
  nextBatch() {
    //this function will guid the user to the next page with the next batch. Waiting for backend to complete
  }
  getComment(batchNumber:string) { //batchNumber will be used later
    // Subscribe to service and save the data in comments list as json obj
    this.commentService.getComment().subscribe(data =>{
      this.comments = data as JSON []
    });
  }
}
