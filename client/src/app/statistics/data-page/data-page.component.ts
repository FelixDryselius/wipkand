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
import { Product } from '../../shared/interfaces/product';
import { element } from 'protractor';

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
  displayComments = {};
  batchList: Batch[];
  statistics: {};
  productList: Product[];
  orders: Order[]; //might not need have info in batch
  displayDataList: DataPageDisplayData[] = [];
  hasValues = false;
  testSpan = 2;


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
       // console.log(this.batchList);
        return this.operationsService.getOrder()        
      })
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {        
        this.orders = (data as QueryResponse).results as Order[]
       // console.log(this.orders);
        this.populateDisplayDataList() // this one needs to be placed somewhere better
      })

    this.productSub = this.operationsService.getProduct()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.productList = (data as QueryResponse).results as Product []
        console.log(this.productList);        
      })

    this.commentSub = this.commentService.getComment()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.commentsList = (data as QueryResponse).results as Comment[]
        //console.log(this.commentsList);
      })

    this.statisticsSub = this.operationsService.getProductionStatistics('?search=' + this.batchDetailID + '&limit=40')
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.statistics = (data as QueryResponse).results
        //console.log(this.statistics);        
      })
  }

  populateDisplayDataList(){
    //to get list of available batch numbers
    if(this.batchList && this.productList && this.commentsList){         
      
      let batchIdList = []
      this.batchList.forEach(element => {
        if(batchIdList.indexOf(element.id) == -1 ){
          batchIdList.push(element.id)                 
        }
      })      
      
      batchIdList.forEach(batchId =>{ 
        let tempBatch;
        let tempProduct;
        let tempCommentsList;        
        
            
        this.displayComments[batchId.valueOf()] = []               
        this.commentsList.forEach(comment=>{                   
          if(comment.batch == batchId){
            this.displayComments[batchId.valueOf()].push(comment)
          }
        })      
      

        this.batchList.forEach(batchElement =>{
          if(batchElement.id == batchId){
            tempBatch = batchElement;
            this.productList.forEach(product =>{
              if(product.article_number == tempBatch.order.article_number){
                tempProduct = product
              }
            })
          
          }
        })        
          
          //this.displayDataList.push( 
            let tempdisplaydata = {
            batch_id: tempBatch.id,
            order_number: tempBatch.order.order_number,
            batch_number: tempBatch.batch_number,
            article_number: tempBatch.order.article_number,
            start_date: tempBatch.start_date,
            end_date: tempBatch.end_date,
            batch_time: new Date(tempBatch.end_date - tempBatch.start_date),
            reference_storage: tempProduct.reference_storage,
            scrap: tempBatch.scrap,
            yield: tempBatch.yield,
            hmi1_good: tempBatch.hmi1_good,
            hmi1_bad: tempBatch.hmi1_bad,
            hmi1_total: tempBatch.hmi1_good - tempBatch.hmi1_bad,
            hmi2_good: tempBatch.hmi2_good,
            hmi2_bad: tempBatch.hmi2_bad,
            hmi2_total: tempBatch.hmi2_good - tempBatch.hmi2_good,
            grand_match_total: (tempBatch.hmi1_good - tempBatch.hmi1_bad) - (tempBatch.hmi2_good - tempBatch.hmi2_good),
            rework_date: tempBatch.rework_date,
            est_pick_replace:(tempBatch.hmi1_bad+tempBatch.hmi2_bad)-tempBatch.scrap*10-tempBatch.applied_labels,
            applied_labels: tempBatch.applied_labels,
            reprint_date: tempBatch.label_print_time,
            rework_time: new Date(tempBatch.label_print_time - tempBatch.end_date),
            comments: this.displayComments[tempBatch.id]

          } as DataPageDisplayData
        //)
         this.displayDataList.push(tempdisplaydata)          
      })

    }  
    console.log(this.displayDataList);
      
    this.hasValues = true
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




