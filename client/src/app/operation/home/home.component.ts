import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { OperationsService } from '../shared/services/operations.service';
import { CommentService } from '../comment/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commentAdded = false;
  commentAddedNotification = 'Your comment was added!';

  // Variables for creating a new comment. 
  private commentDate: Date;
  private commentId: Number;
  private commentName: any;
  private commentText: any;
  private req_comment: any;

  // Variables for submitting data in scoreboard
  private todaysDate: any;

  // Object used for selecting shift
  private shifts:any[]=[
    {shift:'day'}, 
    {shift:'evening'}, 
    {shift:'night'} 
]

  // Variable used for determining which html code to render (day, evening or night)
  private selectedShift: String;

  // Arrays containg times of shifts
  private dayShiftTimes:any[]=[
    {time:'08-09'}, 
    {time:'09-10'}, 
    {time:'10-11'}, 
    {time:'11-12'}, 
    {time:'12-13'}, 
    {time:'13-14'}, 
    {time:'14-15'},
    {time:'15-16'}, 
  ]
  private eveningShiftTimes:any[]=[
    {time:'16-17'}, 
    {time:'17-18'}, 
    {time:'18-19'}, 
    {time:'19-20'}, 
    {time:'20-21'}, 
    {time:'21-22'}, 
    {time:'22-23'},
    {time:'23-00'},
  ]
  private nightShiftTimes:any[]=[
    {time:'00-01'}, 
    {time:'01-02'}, 
    {time:'02-03'}, 
    {time:'03-04'}, 
    {time:'04-05'}, 
    {time:'05-06'}, 
    {time:'06-07'}, 
    {time:'07-08'},
  ]

  // Array with subscribed production data
  shiftProdStats:any[] = [];

  // Arrays containing names of ngModels for every input element
  ngModelStaffDay:any[] = [];
  ngModelStaffEve:any[] = [];
  ngModelStaffNight:any[] = [];
  ngModelProdDay:any[] = [];
  ngModelProdEve:any[] = [];
  ngModelProdNight:any[] = [];

  // A list storing comments fetched from api
  comments: JSON [];

  // A list storing production statistics fetched from api
  prodStats: JSON [];
  first_hour: JSON [];
  
  //the following items are copied from start-batch.component
  private prodActive: boolean;
  private prodInfo: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  constructor(private operationsService: OperationsService, private commentService: CommentService, private http: HttpClient) { }

  ngOnInit() {
    this.getComment()
    //the following items are copied from start-batch.component. Subscribes to be able to connect comment to running batch
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)
    
    // Get production statistics from api
    this.operationsService.getProdStats().subscribe(data =>{
    this.prodStats = data as JSON []
    });
    this.todaysDate = new Date();
    let dd = this.todaysDate.getDate();
    let mm = this.todaysDate.getMonth()+1; 
    let yyyy = this.todaysDate.getFullYear();

    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    this.todaysDate = yyyy+'-'+mm+'-'+dd;

    



    }

    
      

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentService.getComment().subscribe(data =>{
      this.comments = data as JSON []
    });
  }

  // Changes current shift
  onChange(chosenShift) {

    this.shiftProdStats = []

    this.operationsService.getProdStats().subscribe(data =>{
      this.prodStats = data as JSON []
      });

      for(let obj=0; obj<this.prodStats.length; obj++){ 
        if (this.prodStats[obj]["time_stamp"].slice(0,10) == this.todaysDate) {
          this.shiftProdStats.push(this.prodStats[obj])
        }
      }
      while (this.shiftProdStats.length<8) {
        this.shiftProdStats.push('')
      }

      console.log(this.shiftProdStats)
      // if (chosenShift.shift == 'day') {
      //   this.shiftProdStats = this.prodStats.slice(7, 15)
      // }

      // if (chosenShift.shift == 'evening') {
      //   this.shiftProdStats = this.prodStats.slice(15, 23)
      // }

      // if (chosenShift.shift == 'night') {
      //   this.shiftProdStats = this.prodStats.slice(0, 7)
      // }
    
    this.selectedShift = chosenShift.shift;
  }



  submitComment(event, formData) {
    //TODO: Do we really need to store these values in the class? 
    console.log(formData.value)
    this.commentName = formData.value['commentName'];
    this.commentText = formData.value['commentText'];
    this.commentDate = new Date();
    
    let newComment = {
      comment_id: this.comments.length, 
      user_name: this.commentName,
      post_date: this.commentDate,
      text_comment: this.commentText,
      batch_number: this.prodInfo.batch_number,
    }

    // Add new comment through commentService. Also get all comments in api to be able to count for incrementing id next comment
    this.req_comment = this.commentService.addComment(newComment).subscribe(data=>{this.getComment()});

    // Triggers notification
    this.commentAdded = true;

    // Resets form
    formData.resetForm()
  }

  updateProduction(event, formData) {

    let results = {};

    // Collects all changes and stores as dictionary in object results
    for(let key in formData.value) {
      if(typeof formData.value[key] == 'number') {
        results[key] = formData.value[key];
     }
   }
   console.log(results)

   // Sends updated data to service for patch request
   for(let key in results) {
     let change = {}
     let newData = {}
     let counter = 0

      // Must be possible to do this simpler
      // Go through objects in production statistics from api
      
       for(let obj=0; obj<this.prodStats.length; obj++){
        
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.prodStats[obj]["time_stamp"] == key.slice(0, -3)) {

            if (key.substr(key.length-2)=='sq') {
              change = {
                time_stamp: key.slice(0, -3),
                staff_quantity: results[key],
                batch_number: this.prodInfo.batch_number,
              }
              this.operationsService.updateProdStats(change).subscribe();
            } 

            else if (key.substr(key.length-2)=='pq') {
              change = {
                time_stamp: key.slice(0, -3),
                production_quantity: results[key],
                batch_number: this.prodInfo.batch_number,
              }
              this.operationsService.updateProdStats(change).subscribe();
            }
        }
        else {
          counter += 1
          if (counter == this.prodStats.length-1) {
            let time = this.todaysDate+key.slice(10,-3)
            let stringifiedTime = String(time)
            newData = {
              time_stamp: time,
              production_quantity: results[stringifiedTime+'_pq'],
              staff_quantity: results[stringifiedTime+'_sq'],
              batch_number: this.prodInfo.batch_number,
            }  
            this.operationsService.createProdStats(newData).subscribe();   

            this.operationsService.getProdStats().subscribe(data =>{
            this.prodStats = data as JSON []
            });  
          }
          
        }
   }

  }  

}

}
