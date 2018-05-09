import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

// Application imports
import { AuthAPIService } from '../../auth/auth.service';
import { Batch } from '../../shared/interfaces/batch';
import { Comment } from '../../../assets/interface/comment';
import { CommentService } from '../../shared/application-services/comment.service';
import { DataPageDisplayData } from '../../shared/interfaces/dataPageDisplayData';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Order } from '../../shared/interfaces/order';

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {
  private batchDetail: Batch; // might not need
  private batchDetailID: string;
  private batchSub: any;

  private commentSub: any;
  private statisticsSub
  private orderSub: any;

  private productSub: any;

  commentsList: Comment[];
  batchList: Batch[];
  statistics: {};
  products: {};
  orders: Order[]; //might not need have info in batch
  displayDataList: DataPageDisplayData[];
  hasValues = false;


  constructor(
    private authAPI: AuthAPIService,
    private route: ActivatedRoute,
    private location: Location,
    private operationsService: OperationsService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.batchDetailID = '1000000004'
    //TODO: MAKE THIS PAGE GREAT AND REMOVE COMMENTS ETC. MORE INFO ON:
    // https://coryrylan.com/blog/using-angular-forms-with-async-data

    
    this.batchSub = this.operationsService.getBatchDetail()
      .switchMap(data => {
        this.batchList = (data as QueryResponse).results as Batch []
        console.log(this.batchList);
        return this.operationsService.getOrder()        
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {        
        this.orders = (data as QueryResponse).results as Order[]
        console.log(this.orders);
      })

    this.productSub = this.operationsService.getProduct()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.products = (data as QueryResponse).results
        console.log(this.products);        
      })

    this.commentSub = this.commentService.getComment()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.commentsList = (data as QueryResponse).results as Comment[]
        console.log(this.commentsList);
      })

    this.statisticsSub = this.operationsService.getProductionStatistics('?search=' + this.batchDetailID + '&limit=40')
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.statistics = (data as QueryResponse).results
        console.log(this.statistics);        
      })
  }

  populateDisplayDataList(){
    //to get list of available batch numbers
    if(this.batchList){
      let orderNumbersList = []
      this.batchList.forEach(element => {
        if(orderNumbersList.indexOf(element.batch_number) == -1 ){
          orderNumbersList.push(element.batch_number)                 
        }
      })
      orderNumbersList.forEach(orderNumber =>{
        
      })
    }
            
        

  }

  ngOnDestroy() {
    this.batchSub.unsubscribe()
    this.productSub.unsubscribe()
    this.commentSub.unsubscribe()
    this.statisticsSub.unsubscribe()
  }
  goBack() {
    this.location.back()
  }

}




