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

  private productionObservable: Observable<any>;
  private productionSub: any;
  prodStats: {};

  private floorstockItemsObservable: Observable<any>;
  private floorstockItemsSub: any;
  floorstockItems: {};

  private floorstockChangesObservable: Observable<any>;
  private floorstockChangesSub: any;
  floorstockChanges: {};

  //private prodStats: JSON[];
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
  //private scoreboardActive: boolean = false;

  // Arrays containing names of ngModels for every input element
  ngModelStaffDay: any[] = [];
  ngModelStaffEve: any[] = [];
  ngModelStaffNight: any[] = [];
  ngModelProdDay: any[] = [];
  ngModelProdEve: any[] = [];
  ngModelProdNight: any[] = [];

  private dayShiftTimes: any[] = [
    { time: '08-09', shift: '08' },
    { time: '09-10', shift: '09' },
    { time: '10-11', shift: '10' },
    { time: '11-12', shift: '11' },
    { time: '12-13', shift: '12' },
    { time: '13-14', shift: '13' },
    { time: '14-15', shift: '14' },
    { time: '15-16', shift: '15' },
  ]

  private eveningShiftTimes: any[] = [
    { time: '16-17', shift: '16' },
    { time: '17-18', shift: '17' },
    { time: '18-19', shift: '18' },
    { time: '19-20', shift: '19' },
    { time: '20-21', shift: '20' },
    { time: '21-22', shift: '21' },
    { time: '22-23', shift: '22' },
    { time: '23-00', shift: '23' },
  ]
  private nightShiftTimes: any[] = [
    { time: '00-01', shift: '00' },
    { time: '01-02', shift: '01' },
    { time: '02-03', shift: '02' },
    { time: '03-04', shift: '03' },
    { time: '04-05', shift: '04' },
    { time: '05-06', shift: '05' },
    { time: '06-07', shift: '06' },
    { time: '07-08', shift: '07' },
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

    this.getTime()

    this.onChange('day')

  }

  getTime() {
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
    dd = formatUnit(dd)
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
        if (this.prodInfo && this.floorstockChanges[k]["batch_number"] == this.prodInfo.batch_number) {
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
  }

  // Function that is being called when option in dropdown menu has been selected
  onChange(chosenShift) {
    this.productionObservable = this.operationsService.getProdStats()
    this.productionSub = this.productionObservable.subscribe(data => {
      this.prodStats = (data as QueryResponse).results

      this.shiftProdStats = [];
      let shiftTimes;
      this.selectedShift = chosenShift

      if (this.selectedShift == 'day') {
        shiftTimes = this.dayShiftTimes
      }
      else if (this.selectedShift == 'evening') {
        shiftTimes = this.eveningShiftTimes
      }
      else {
        shiftTimes = this.nightShiftTimes
      }
      
      for (let key in shiftTimes) {
        let prodData = { time_stamp: this.todaysDate + 'T' + shiftTimes[key]["shift"] + ':00:00Z' }
        this.shiftProdStats.push(prodData)
      }

      if (this.selectedShift == 'day') {
        getOldData(this.prodInfo, this.todaysDate, this.prodStats, this.shiftProdStats, 8, 16)
      }
      if (this.selectedShift == 'evening') {
        getOldData(this.prodInfo, this.todaysDate, this.prodStats, this.shiftProdStats, 16, 24)
      }
      if (this.selectedShift == 'night') {
        getOldData(this.prodInfo, this.todaysDate, this.prodStats, this.shiftProdStats, 0, 8)
      }

      function getOldData(prodInfo, todaysDate, prodStats, shiftProdStats, startShift, endShift) {
        for (let inp = 0; inp < prodStats.length; inp++) {
          if (prodInfo && prodInfo.batch_number == prodStats[inp]["batch_number"] && prodStats[inp]["time_stamp"].slice(0, 10) == todaysDate && (startShift - 1) < prodStats[inp]["time_stamp"].slice(11, 13) && prodStats[inp]["time_stamp"].slice(11, 13) < (endShift - 1)) {
            for (let obj = 0; obj < shiftProdStats.length; obj++) {
              if (shiftProdStats[obj]["time_stamp"] == prodStats[inp]["time_stamp"]) {
                shiftProdStats[obj]["production_quantity"] = prodStats[inp]["production_quantity"]
                shiftProdStats[obj]["staff_quantity"] = prodStats[inp]["staff_quantity"]
                shiftProdStats[obj]["batch_number"] = prodStats[inp]["batch_number"]
              }
            }
          }
        }
      }
      for (let obj = 0; obj < this.shiftProdStats.length; obj++) {
        if (typeof this.shiftProdStats[obj]["production_quantity"] == 'undefined' && typeof this.shiftProdStats[obj]["staff_quantity"] == 'undefined') {
          this.shiftProdStats[obj]["production_quantity"] = ''
          this.shiftProdStats[obj]["staff_quantity"] = ''
          this.shiftProdStats[obj]["batch_number"] = ''
        }
      }
      console.log("Initial data for " + chosenShift + ":")
      console.log(this.shiftProdStats)
    });
  }

  updateProduction(event, formData) {

    let results: any = {};
    let primaryKeys = {};

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
      for (let obj in this.prodStats) {
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.prodStats[obj]["time_stamp"] == key.slice(0, -3)) {
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
          if (counter == Object.keys(this.prodStats).length) {
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
    this.getTime()
    let results: any = {};
    let primaryKeys = {};
    for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
      primaryKeys[this.currentFloorstock[obj]["item_id"]] = this.currentFloorstock[obj]["last_update"]
    }

    // Collects all changes and stores as dictionary in the object results
    for (let key in inputData.value) {
      if (typeof inputData.value[key] == 'number') {
        results[key] = inputData.value[key];
      }
    }

    for (let key in results) {
      let counter = 0;
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.currentFloorstock[obj]["item_id"] == key && this.currentFloorstock[obj]["batch_number"] == this.prodInfo.batch_number) {
          for (let k in primaryKeys) {
            if (k == key) {
              let lastUpdate = primaryKeys[k]

              let updateItem = {
                time_stamp: lastUpdate,
                quantity: results[key],
                floorstock_item: key,
                batch_number: this.prodInfo.batch_number,
              }
              this.operationsService.updateFloorstock(updateItem).subscribe();
            }
          }
        }
        else {
          counter += 1
          // If no time stamp in api was found this means it is new data
          if (counter == this.currentFloorstock.length - 1) {
            let createItem = {
              time_stamp: this.todaysDate + 'T' + this.currentTime + 'Z',
              quantity: results[key],
              floorstock_item: key,
              batch_number: this.prodInfo.batch_number,
            }
            this.operationsService.createFloorstock(createItem).subscribe();
            this.getFloorstock()
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
