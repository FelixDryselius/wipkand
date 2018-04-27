import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Application imports
import { OperationsService } from '../shared/services/operations.service';
import { CommentService } from '../../shared/application-services/comment.service';
import { QueryResponse } from '../../shared/interfaces/query-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private masterObservable: Observable<any>;

  private floorstockItemsObservable: Observable<any>;
  private floorstockItemsSub: any;
  floorstockItems: {};

  private floorstockChangesObservable: Observable<any>;
  private floorstockChangesSub: any;
  floorstockChanges: {};

  private floorstockObservable: Observable<any>;

  private prodStats: JSON[];
  private comments: JSON[];

  // SCOREBOARD SECTION

  shiftProdStats: any[] = [];

  // Variables for getting todays date
  private todaysDate: any;
  private currentTime: any;

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

  private dayShiftTimes: any[] = [
    { time: '08-09' },
    { time: '09-10' },
    { time: '10-11' },
    { time: '11-12' },
    { time: '12-13' },
    { time: '13-14' },
    { time: '14-15' },
    { time: '15-16' },
  ]

  private eveningShiftTimes: any[] = [
    { time: '16-17' },
    { time: '17-18' },
    { time: '18-19' },
    { time: '19-20' },
    { time: '20-21' },
    { time: '21-22' },
    { time: '22-23' },
    { time: '23-00' },
  ]
  private nightShiftTimes: any[] = [
    { time: '00-01' },
    { time: '01-02' },
    { time: '02-03' },
    { time: '03-04' },
    { time: '04-05' },
    { time: '05-06' },
    { time: '06-07' },
    { time: '07-08' },
  ]

  // END SCOREBOARD SECTION  


  // FLOORSTOCK SECTION

  currentFloorstock: any[] = [];

  ngModelFloorstock: any[] = [];
  // END FLOORSTOCK SECTION


  // COMMENT SECTION
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

  //the following items are copied from start-batch.component
  private prodActive: boolean;
  private prodInfo: any;
  private service_prodStatus: any;
  private service_prodInfo: any;

  constructor(private operationsService: OperationsService, private commentService: CommentService, private http: HttpClient) { }



  ngOnInit() {

    // Calls function that subscribes to data from api    
    this.getFloorstock()
    this.getComment()
    this.getScoreboard()

    //the following items are copied from start-batch.component. Subscribes to be able to connect comment to running batch
    this.service_prodStatus = this.operationsService.prodActiveObservable.subscribe(active => this.prodActive = active)
    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => this.prodInfo = info)

    // Get todays date and format to yyy-mm-dd
    this.todaysDate = new Date();
    let sec = this.todaysDate.getSeconds();
    let min = this.todaysDate.getMinutes();
    let hh = this.todaysDate.getHours();
    let dd = this.todaysDate.getDate();
    let mm = this.todaysDate.getMonth() + 1;
    let yyyy = this.todaysDate.getFullYear();

    function formatUnit(timeUnit) {
      if (timeUnit < 10) {
        timeUnit = '0' + timeUnit;
      }
      return timeUnit
    }

    mm = formatUnit(mm)
    hh = formatUnit(hh)
    min = formatUnit(min)
    sec = formatUnit(sec)

    this.currentTime = hh + ':' + min + ':' + sec;
    this.todaysDate = yyyy + '-' + mm + '-' + dd;

  }

  getScoreboard() {
    this.operationsService.getProdStats().subscribe(data => {
      this.prodStats = data as JSON[]
    });
  }

  getFloorstock() {

    this.floorstockItemsObservable = this.operationsService.getFloorstockItems()
    this.floorstockItemsSub = this.floorstockItemsObservable.subscribe(data => {
      this.floorstockItems = (data as QueryResponse).results
    });

    this.floorstockChangesObservable = this.operationsService.getFloorstockChanges()
    this.floorstockChangesSub = this.floorstockChangesObservable.subscribe(data => {
      this.floorstockChanges = (data as QueryResponse).results

      this.currentFloorstock = [];

      console.log("floorstockChanges: ")
      console.log(this.floorstockChanges)
      for (let key in this.floorstockItems) {
        let item = { item_name: this.floorstockItems[key]["item_name"] }
        item["item_id"] = this.floorstockItems[key]["item_id"]
        this.currentFloorstock.push(item)
      }
      for (let k in this.floorstockChanges) {
        if (this.floorstockChanges[k]["batch_number"] == this.prodInfo.batch_number) {
          for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
            if (this.currentFloorstock[obj]["item_id"] == this.floorstockChanges[k]["floorstock_item"]) {
              this.currentFloorstock[obj]["quantity"] = this.floorstockChanges[k]["quantity"]
              this.currentFloorstock[obj]["last_update"] = this.floorstockChanges[k]["time_stamp"]
              this.currentFloorstock[obj]["batch_number"] = this.floorstockChanges[k]["batch_number"]
            }
          }
        }
      }
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        if (typeof this.currentFloorstock[obj]["quantity"] == 'undefined') {
          this.currentFloorstock[obj]["quantity"] = 0
          this.currentFloorstock[obj]["last_update"] = ''
          this.currentFloorstock[obj]["batch_number"] = ''
        }
      }
      console.log("currentFloorstock: ")
      console.log(this.currentFloorstock)
    });
  }

  getComment() {
    // Subscribe to service and save the data in comments list
    this.commentService.getComment().subscribe(data => {
      this.comments = data as JSON[]
    });

    this.masterObservable = this.commentService.getComment()
    this.masterObservable.subscribe(data => {
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
        if (prodStats["results"][obj]["time_stamp"].slice(0, 10) == todaysDate && (startShift - 1) < prodStats["results"][obj]["time_stamp"].slice(11, 13) && prodStats["results"][obj]["time_stamp"].slice(11, 13) < (endShift - 1)) {
          shiftProdstats.unshift(prodStats["results"][obj])
        }
      }
    }

    if (this.selectedShift == 'day') {
      getOldData(this.todaysDate, this.prodStats, this.shiftProdStats, 8, 16)
    }
    if (this.selectedShift == 'evening') {
      getOldData(this.todaysDate, this.prodStats, this.shiftProdStats, 16, 24)
    }
    if (this.selectedShift == 'night') {
      getOldData(this.todaysDate, this.prodStats, this.shiftProdStats, 0, 8)
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
    console.log("Initial data for " + this.selectedShift + ":")
    console.log(this.shiftProdStats)
  }

  updateProduction(event, formData) {

    console.log(formData.value)

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

            this.getScoreboard()
          }
        }
      }
    }
  }

  updateFloorstock(event, inputData) {
    let results: any = {};
    let primaryKeys = {};
    for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
      primaryKeys[this.currentFloorstock[obj]["item_id"]] = this.currentFloorstock[obj]["last_update"]
    }

    console.log(primaryKeys)

    // Collects all changes and stores as dictionary in the object results
    for (let key in inputData.value) {
      if (typeof inputData.value[key] == 'number') {
        results[key] = inputData.value[key];
      }
    }
    for (let key in results) {
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.currentFloorstock[obj]["item_id"] == key && this.currentFloorstock[obj]["batch_number"] == this.prodInfo.batch_number) {
          for (let k in primaryKeys) {
            if (k == key) {
              let lastUpdate = primaryKeys[k]

              console.log("last update "+lastUpdate)
              let updateItem = {
                time_stamp: lastUpdate,
                quantity: results[key],
              }
              this.operationsService.updateFloorstock(updateItem).subscribe();
              this.getFloorstock()
            }
          }
        }

      }

    }

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
}
