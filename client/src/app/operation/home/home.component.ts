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

  // COMMENT SECTION
  // A list storing comments fetched from api
  comments: JSON[];

  // Variables for add comment used html
  commentAdded = false;
  commentAddedNotification = 'Your comment was added!';

  // Variables for creating a new comment. 
  private commentDate: Date;
  private commentId: Number;
  private commentName: any;
  private commentText: any;
  private req_comment: any;

  // END COMMENT SECTION

  // SCOREBOARD SECTION
  // Arrays storing production statistics fetched from api
  prodStats: JSON[];
  shiftProdStats: any[] = [];

  // Variables for getting todays date
  private todaysDate: any;

  // Array of shifts you can select in dropdown
  private shifts: String[] = ['day', 'evening', 'night']

  // Variable used for determining which html code to render (day, evening or night)
  private selectedShift: String;
  private scoreboardActive: boolean = false;

  // Arrays containing names of ngModels for every input element
  ngModelStaffDay: any[] = [];
  ngModelStaffEve: any[] = [];
  ngModelStaffNight: any[] = [];
  ngModelProdDay: any[] = [];
  ngModelProdEve: any[] = [];
  ngModelProdNight: any[] = [];

  // END SCOREBOARD SECTION

  //the following items are copied from start-batch.component
  private prodActive: boolean;
  private prodInfo: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  constructor(private operationsService: OperationsService, private commentService: CommentService, private http: HttpClient) { }

  ngOnInit() {

    // Calls function that subscribes to comment data from api
    this.getComment()

    //the following items are copied from start-batch.component. Subscribes to be able to connect comment to running batch
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

    // Get production statistics from api
    this.operationsService.getProdStats().subscribe(data => {
      this.prodStats = data as JSON[]
    });

    // Get todays date and format to yyy-mm-dd
    this.todaysDate = new Date();
    let dd = this.todaysDate.getDate();
    let mm = this.todaysDate.getMonth() + 1;
    let yyyy = this.todaysDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.todaysDate = yyyy + '-' + mm + '-' + dd;
  }

  getComment() {
    // Subscribe to service and save the data in comments list
    this.commentService.getComment().subscribe(data => {
      this.comments = data as JSON[]
    });
  }

  // Function that is being called when option in dropdown menu has been selected
  onChange(chosenShift) {

    let new_hour: any;
    let firstHour: any;
    let firstHourShift: any[] = ["T08:00:00Z", "T16:00:00Z", "T00:00:00Z"];

    // Sets scoreboardActive to true show correct html
    this.scoreboardActive = true;
    this.shiftProdStats = [];
    this.selectedShift = chosenShift;

    // A function that creates a filler object to be put in shiftProdStats for hours without data
    function createFiller(shiftProdStats) {
      let last_time_stamp = shiftProdStats.slice(-1)[0]["time_stamp"]
      let last_hour = last_time_stamp.slice(11, 13)
      let new_hour = parseInt(last_hour) + 1
      let new_time_stamp = replaceAt(last_time_stamp, last_hour, new_hour, 11, 13)

      let fillerObj =
        {
          time_stamp: new_time_stamp,
          production_quantity: '',
          staff_quantity: '',
        }
        return fillerObj;
    }

    // A function that correctly replaces previos time stamp with next hour 
    function replaceAt(input, search, replace, start, end) {
      replace = replace.toString()
      replace = ('0' + replace).slice(-2)
      replace = input.slice(start, end).replace(search, replace)
      replace = ('0' + replace).slice(-2)
      return input.slice(0, start)
        + replace
        + input.slice(end);
    }

    // A function that compares previous data from the api with todays date and selected shift
    function getOldData(todaysDate, prodStats, shiftProdstats, startShift, endShift) {
      for (let obj = 0; obj < prodStats["results"].length; obj++) {
        if (prodStats["results"][obj]["time_stamp"].slice(0, 10) == todaysDate && (startShift-1) < prodStats["results"][obj]["time_stamp"].slice(11, 13) && prodStats["results"][obj]["time_stamp"].slice(11, 13) < (endShift-1)) {
          shiftProdstats.unshift(prodStats["results"][obj])
        }
      }
    }

    if (this.selectedShift == 'day') {
      getOldData(this.todaysDate, this.prodStats,this.shiftProdStats,8,16)
    }
    if (this.selectedShift == 'evening') {
      getOldData(this.todaysDate, this.prodStats,this.shiftProdStats,16,24)
    }
    if (this.selectedShift == 'night') {
      getOldData(this.todaysDate, this.prodStats,this.shiftProdStats,0,8)
    }
    
    // A while-loop that fills shiftProdStats with empty data and correct time stamps. This so the code will know what cell has new data when a user adds data to an empty cell
    while (this.shiftProdStats.length < 8) {
      
      if (this.shiftProdStats.length == 0) {
        if (this.selectedShift == 'day') {
          firstHour = this.todaysDate + firstHourShift[0]
        }
        else if (this.selectedShift == 'evening') {
          firstHour = this.todaysDate + firstHourShift[1]
        }
        else if (this.selectedShift == 'night') {
          firstHour = this.todaysDate + firstHourShift[2]
        }
        let firstObj =
          {
            time_stamp: firstHour,
            production_quantity: '',
            staff_quantity: '',
          }
        this.shiftProdStats.push(firstObj)

        let filler = createFiller(this.shiftProdStats)
        this.shiftProdStats.push(filler)
      }

      else {
        let filler = createFiller(this.shiftProdStats)
        this.shiftProdStats.push(filler)
      }

    }
    console.log("Initial data for "+this.selectedShift+":")
    console.log(this.shiftProdStats)
  }

  submitComment(event, formData) { 

    this.commentName = formData.value['commentName'];
    this.commentText = formData.value['commentText'];
    this.commentDate = new Date();

    let newComment = {
      comment_id: this.comments["results"].length,
      user_name: this.commentName,
      post_date: this.commentDate,
      text_comment: this.commentText,
      batch_number: this.prodInfo.batch_number,
    }
    // Add new comment through commentService. Also get all comments in api to be able to count for incrementing id next comment
    this.req_comment = this.commentService.addComment(newComment).subscribe(data => { this.getComment() });

    // Triggers notification
    this.commentAdded = true;

    // Resets form
    formData.resetForm()
  }

  updateProduction(event, formData) {

    let results: any = {};

    // Collects all changes and stores as dictionary in the object results
    for (let key in formData.value) {
      if (typeof formData.value[key] == 'number') {
        results[key] = formData.value[key];
      }
    }

    // A for-loop that for each new data compares it with existing data from the database
    for (let key in results) {
      let changeData = {}
      let newData = {}
      let counter = 0

      // Go through objects in production statistics from api
      for (let obj = 0; obj < this.prodStats["results"].length; obj++) {
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.prodStats["results"][obj]["time_stamp"] == key.slice(0, -3)) {
          if (key.substr(key.length - 2) == 'sq') {
            changeData = {
              time_stamp: key.slice(0, -3),
              staff_quantity: results[key],
              batch_number: this.prodInfo.batch_number,
            }
            this.operationsService.updateProdStats(changeData).subscribe();
          }
          else if (key.substr(key.length - 2) == 'pq') {
            changeData = {
              time_stamp: key.slice(0, -3),
              production_quantity: results[key],
              batch_number: this.prodInfo.batch_number,
            }
            this.operationsService.updateProdStats(changeData).subscribe();
          }
        }
        else {
          counter += 1
          // If no time stamp in api was found this means it is new data
          if (counter == this.prodStats["results"].length - 1) {
            let time = this.todaysDate + key.slice(10, -3)
            let stringifiedTime = String(time)

            newData = {
              time_stamp: time,
              production_quantity: results[stringifiedTime + '_pq'],
              staff_quantity: results[stringifiedTime + '_sq'],
              batch_number: this.prodInfo.batch_number,
            }
            this.operationsService.createProdStats(newData).subscribe();

            this.operationsService.getProdStats().subscribe(data => {
              this.prodStats = data as JSON[]
            });
          }
        }
      }
    }
  }
}
