import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { OperationsService } from '../shared/services/operations.service';
import { CommentService } from '../../shared/application-services/comment.service';

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
  private shifts=['day', 'evening', 'night']
  

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
  private dayShiftNames:any[]=[
    {time:'T08:00:00Z'}, 
    {time:'T09:00:00Z'},
    {time:'T10:00:00Z'},
    {time:'T11:00:00Z'},
    {time:'T12:00:00Z'},
    {time:'T13:00:00Z'},
    {time:'T14:00:00Z'},
    {time:'T15:00:00Z'},
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
  private id: number;

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

    this.selectedShift = chosenShift;
    
    function replaceAt(input, search, replace, start, end) {
      let replacer = input.slice(start, end).replace(search, replace)
      replacer = ('0' + replacer).slice(-2)
        return  input.slice(0, start) 
              + replacer
              + input.slice(end);
        }

       if (this.selectedShift == 'day') {
         
         for(let obj=0; obj<this.prodStats["results"].length; obj++){
            if (this.prodStats["results"][obj]["time_stamp"].slice(0,10) == this.todaysDate && 7<this.prodStats["results"][obj]["time_stamp"].slice(11,13) && this.prodStats["results"][obj]["time_stamp"].slice(11,13)<16) {
             this.shiftProdStats.unshift(this.prodStats["results"][obj])  
           }
         }  
        }     
        if (this.selectedShift == 'evening') {
      
          for(let obj=0; obj<this.prodStats["results"].length; obj++){
            
             if (this.prodStats["results"][obj]["time_stamp"].slice(0,10) == this.todaysDate && 15<this.prodStats["results"][obj]["time_stamp"].slice(11,13) && this.prodStats["results"][obj]["time_stamp"].slice(11,13)<24) {
              this.shiftProdStats.unshift(this.prodStats["results"][obj])  
            }
          }  
         } 
         if (this.selectedShift == 'night') {
      
          for(let obj=0; obj<this.prodStats["results"].length; obj++){
            
             if (this.prodStats["results"][obj]["time_stamp"].slice(0,10) == this.todaysDate && this.prodStats["results"][obj]["time_stamp"].slice(11,13)<8) {
              this.shiftProdStats.unshift(this.prodStats["results"][obj])  
            }
          }  
         }  
        
        while (this.shiftProdStats.length<8) {
          let first:any
            if (this.shiftProdStats.length == 0) {
              if (this.selectedShift == 'day') {
                first = this.todaysDate+"T08:00:00Z"
              }
              else if (this.selectedShift == 'evening') {
                first = this.todaysDate+"T16:00:00Z"
              }
              else if (this.selectedShift == 'night') {
                first = this.todaysDate+"T00:00:00Z"
              }
              let firstObj =
              { 
                    time_stamp: first,
                    production_quantity:'',
                    staff_quantity:''
              }
              this.shiftProdStats.push(firstObj)

              let i = first
              let last_time = i.slice(11,13)
              last_time = parseInt(last_time)
              last_time += 1
              last_time = ('0' + last_time).slice(-2)
              last_time = String(last_time)
              let mod = i.replace(i.slice(11,13),last_time)
              let filler =
              { 
                    time_stamp: mod,
                    production_quantity:'',
                    staff_quantity:''
              }
                  this.shiftProdStats.push(filler)
                  }
            
            else {

              let last_time_stamp = this.shiftProdStats.slice(-1)[0]["time_stamp"]

              let last_hour = last_time_stamp.slice(11,13)
           
              last_hour = parseInt(last_hour)
            
              let new_hour = last_hour+1
           
              new_hour = new_hour.toString()
          
              new_hour = ('0' + new_hour).slice(-2)
        
              new_hour = new_hour.toString()

              let new_time_stamp = replaceAt(last_time_stamp, last_hour, new_hour, 11, 13)


              let filler =
              { 
                    time_stamp: new_time_stamp,
                    production_quantity:'',
                    staff_quantity:''
              }
                  this.shiftProdStats.push(filler)
                  }

          }
         console.log(this.shiftProdStats)
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
        console.log(key)
        results[key] = formData.value[key];
 
     }
   }


   // Sends updated data to service for patch request
   for(let key in results) {
     let change = {}
     let newData = {}
     let counter = 0
     
      // Must be possible to do this simpler
      // Go through objects in production statistics from api
 
       for(let obj=0; obj<this.prodStats["results"].length; obj++){
        //console.log("time_stamp api "+this.prodStats[obj]["time_stamp"])
        //console.log("key "+key.slice(0, -3))
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.prodStats["results"][obj]["time_stamp"] == key.slice(0, -3)) {
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
          if (counter == this.prodStats["results"].length-1) {
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
