
import { AuthAPIService } from '../../auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OperationsService } from '../shared/services/operations.service';
import { CommentService } from '../../shared/application-services/comment.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Batch } from '../../shared/interfaces/batch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitIfValidDirective } from '../../shared/directives/submit-if-valid.directive';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/validators/customValidation';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent implements OnInit {

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

  addedProdData = [];
  scoreboardAdded = false;


  // Variables for getting todays date
  private todaysDate: any;
  private currentTime: any;

  // Array of shifts you can select in dropdown

  // Variable used for determining which html code to render (day, evening or night)
  private shiftDate: any;
  //private scoreboardActive: boolean = false;

  // Arrays containing names of ngModels for every input element
  ngModelStaffDay: any[] = [];
  ngModelStaffEve: any[] = [];
  ngModelStaffNight: any[] = [];
  ngModelProdDay: any[] = [];
  ngModelProdEve: any[] = [];
  ngModelProdNight: any[] = [];

  private prodDataColumns = ['Time stamp', 'On shift', 'Produced']

  // END SCOREBOARD SECTION  


  // FLOORSTOCK SECTION

  floorstockAdded = false;

  private productLabelPairs: any[] = [
    { article_number: '700-5208', label: 'Groninger Label 301-6914' },
    { article_number: '700-5194', label: 'Groninger Label 301-6915' },
    { article_number: '700-5196', label: 'Groninger Label 301-7905' },
    { article_number: '700-5197', label: 'Groninger Label 301-8023' },
    { article_number: '700-5280', label: 'Groninger Label 301-8025' },
    { article_number: '700-5288', label: 'Groninger Label 301-8025' },
  ]

  currentFloorstock: any[] = [];
  ngModelFloorstock: any[] = [];

  // END FLOORSTOCK SECTION


  // COMMENT SECTION
  // Variables for add comment used html
  commentAdded = false;

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

  private productionForm: FormGroup;
  date1: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>

  constructor(
    private operationsService: OperationsService,
    private commentService: CommentService,
    private http: HttpClient, private authAPI: AuthAPIService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.getTime()
    this.createAddDataForm()

    this.service_prodInfo = this.operationsService.prodInfoObservable.subscribe(info => {
      this.prodInfo = info
      if (this.prodInfo) {
        this.getProdList()
        this.getFloorstock()
        this.getComment()
      }
    })


  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month -1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.minDate = new Date();
  this.minDate.setMonth(prevMonth);
  this.minDate.setFullYear(prevYear);
  this.maxDate = new Date();
  this.maxDate.setMonth(nextMonth);
  this.maxDate.setFullYear(nextYear);

  let invalidDate = new Date();
  invalidDate.setDate(today.getDate() - 1);
  this.invalidDates = [today,invalidDate];
  }

  createAddDataForm() {
    this.productionForm = this.formBuilder.group({
      'inputDate': new FormControl('', [
        Validators.required
      ]),
      'onShift': new FormControl('', [
        Validators.required
      ]),
      'produced': new FormControl('', [
        Validators.required
      ]),
    })
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
    this.operationsService.getProdStats('?batch_number=' + this.prodInfo.batch_number)
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.prodStats = (data as QueryResponse).results
      });
  }

  getFloorstock() {

    this.floorstockItemsSub = this.operationsService.getFloorstockItems()
      .switchMap(data => {
        this.floorstockItems = (data as QueryResponse).results
        return this.operationsService.getFloorstockChanges('?batch_number=' + this.prodInfo.batch_number)
      })

      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.floorstockChanges = (data as QueryResponse).results

        let correctLabel;

        for (let key in this.productLabelPairs) {
          if (this.productLabelPairs[key].article_number == this.prodInfo.order.article_number) {
            correctLabel = this.productLabelPairs[key].label
          }
        }
        this.currentFloorstock = [];
        console.log(this.floorstockItems)
        for (let key in this.floorstockItems) {
          if (
            this.floorstockItems[key]["item_name"] == correctLabel ||
            this.floorstockItems[key]["item_name"] == "Zebra Label" ||
            this.floorstockItems[key]["item_name"] == "Scale Roll" ||
            this.floorstockItems[key]["item_name"] == "Pester 301-6908" ||
            this.floorstockItems[key]["item_name"] == "Pester 301-6907" ||
            this.floorstockItems[key]["item_name"] == "Sleever 301-6906" ||
            this.floorstockItems[key]["item_name"] == "Groninger Carbon 001-1995"
          ) {

            let item = { item_name: this.floorstockItems[key]["item_name"] }
            item["item_id"] = this.floorstockItems[key]["item_id"]
            this.currentFloorstock.push(item)
          }
        }
        for (let k in this.floorstockChanges) {
          for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
            if (this.currentFloorstock[obj]["item_id"] == this.floorstockChanges[k]["floorstock_item"]) {
              this.currentFloorstock[obj]["id"] = this.floorstockChanges[k]["id"]
              this.currentFloorstock[obj]["quantity"] = this.floorstockChanges[k]["quantity"]
              this.currentFloorstock[obj]["last_update"] = this.floorstockChanges[k]["time_stamp"]
              this.currentFloorstock[obj]["batch"] = this.floorstockChanges[k]["batch"]

            }
          }
        }
        for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
          if (typeof this.currentFloorstock[obj]["quantity"] == 'undefined') {
            this.currentFloorstock[obj]["id"] = null
            this.currentFloorstock[obj]["quantity"] = 0
            this.currentFloorstock[obj]["last_update"] = ''
            this.currentFloorstock[obj]["batch"] = ''
          }
        }
        console.log("currentFloorstock: ")
        console.log(this.currentFloorstock)

        console.log("floorstockChanges: ")
        console.log(this.floorstockChanges)


      });
  }

  addOne(item_id, quantity, change) {
    if (change == 'incr') {
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        if (this.currentFloorstock[obj]["item_id"] == item_id) {
          this.currentFloorstock[obj]["quantity"] += 1
        }
      }
    }
    else if (change == 'decr') {
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        if (this.currentFloorstock[obj]["item_id"] == item_id && this.currentFloorstock[obj]["quantity"] > 0) {
          this.currentFloorstock[obj]["quantity"] -= 1
        }
      }
    }
  }

  getComment() {
    // Subscribe to service and save the data in comments list as json obj
    this.commentService.getComment()
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.comments = data as JSON[]
      });
  }

  // Function that is being called when option in dropdown menu has been selected

  getProdList() {
    this.productionObservable = this.operationsService.getProdStats('?batch_number=' + this.prodInfo.batch_number)

    this.productionSub = this.productionObservable
      .retryWhen(error => this.authAPI.checkHttpRetry(error))
      .subscribe(data => {
        this.prodStats = (data as QueryResponse).results


        console.log(this.prodStats)


        /* this.shiftProdStats = [];
         let shiftTimes;
         this.selectedShift = shift
         this.shiftDate = date
   
         if (this.selectedShift == 'day') {
           shiftTimes = this.dayShiftTimes
         }
         else if (this.selectedShift == 'evening') {
           shiftTimes = this.eveningShiftTimes
         }
         else if (this.selectedShift == 'night') {
           shiftTimes = this.nightShiftTimes
         }
   
         for (let key in shiftTimes) {
           let prodData = { time_stamp: this.shiftDate + 'T' + shiftTimes[key]["shift"] + ':00:00Z' }
           this.shiftProdStats.push(prodData)
         }
   
         if (this.selectedShift == 'day') {
   
           console.log(this.prodStats)
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
             if ((startShift - 1) < prodStats[inp]["time_stamp"].slice(11, 13) && prodStats[inp]["time_stamp"].slice(11, 13) < (endShift)) {
               for (let obj = 0; obj < shiftProdStats.length; obj++) {
                 if (shiftProdStats[obj]["time_stamp"] == prodStats[inp]["time_stamp"]) {
                   shiftProdStats[obj]["production_quantity"] = prodStats[inp]["production_quantity"]
                   shiftProdStats[obj]["staff_quantity"] = prodStats[inp]["staff_quantity"]
                   shiftProdStats[obj]["batch"] = prodStats[inp]["batch"]
                 }
               }
             }
           }
         }
   
         for (let obj = 0; obj < this.shiftProdStats.length; obj++) {
           if (typeof this.shiftProdStats[obj]["production_quantity"] == 'undefined' && typeof this.shiftProdStats[obj]["staff_quantity"] == 'undefined') {
             this.shiftProdStats[obj]["production_quantity"] = ''
             this.shiftProdStats[obj]["staff_quantity"] = ''
             this.shiftProdStats[obj]["batch"] = ''
           }
         }
         console.log("Initial data for " + this.selectedShift + ":")
         console.log(this.shiftProdStats)
         this.addShift(false)*/
      });

  }

  submitProduction(event, formData) {

    let inputData: any = {};

    // Collects all changes and stores as dictionary in the object results
    for (let key in formData) {
      inputData[key] = formData[key];
    }

   
      if (typeof inputData.inputDate != 'undefined' && typeof inputData.produced != 'undefined' && inputData.onShift != 'undefined') {
        
      let newData = {
        time_stamp: inputData.inputDate+'Z',
        production_quantity: inputData.produced,
        staff_quantity: inputData.onShift,
        batch: this.prodInfo.id,
      }
      this.operationsService.createProdStats(newData)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe();

      this.feedbackScoreboard()
    }
    else {
      alert("All fields are required to post new data")
    }
    

    
  }
  /*
  // A for-loop that for each new data compares it with existing data from the database
  for (let key in results) {
    let changeData = {}
    let newData = {}
    let counter = 0
   
    // Go through objects in production statistics from api
    for (let obj in this.shiftProdStats) {
      // Checks if time stamp exists. Determines wheter data should be created or updated
      if (this.shiftProdStats[obj]["time_stamp"] == key.slice(0, -3) && (this.shiftProdStats[obj]["staff_quantity"] > 0 || this.shiftProdStats[obj]["staff_quantity"] == null) && key.substr(key.length - 2) == 'sq') {
        changeData = {
          time_stamp: key.slice(0, -3),
          staff_quantity: results[key],
          batch: this.prodInfo.id,
        }
        this.operationsService.updateProdStats(changeData)
          .retryWhen(error => this.authAPI.checkHttpRetry(error))
          .subscribe();
        this.feedbackScoreboard()
      }
      else if (this.shiftProdStats[obj]["time_stamp"] == key.slice(0, -3) && (this.shiftProdStats[obj]["production_quantity"] > 0 || this.shiftProdStats[obj]["production_quantity"] == null) && key.substr(key.length - 2) == 'pq') {
        changeData = {
          time_stamp: key.slice(0, -3),
          production_quantity: results[key],
          batch: this.prodInfo.id,
        }
        this.operationsService.updateProdStats(changeData)
          .retryWhen(error => this.authAPI.checkHttpRetry(error))
          .subscribe();
        this.feedbackScoreboard()
      }
   
      else {
   
        counter += 1
        // If no time stamp in api was found this means it is new data
        if (counter == this.shiftProdStats.length) {
   
          let time = this.shiftDate + key.slice(10, -3)
          let stringifiedTime = String(time)
   
          if (this.addedProdData.indexOf(stringifiedTime) == -1) {
            this.addedProdData.push(stringifiedTime)
            if (typeof results[stringifiedTime + '_pq'] != 'undefined' && typeof results[stringifiedTime + '_sq'] != 'undefined') {
              newData = {
                time_stamp: time,
                production_quantity: results[stringifiedTime + '_pq'],
                staff_quantity: results[stringifiedTime + '_sq'],
                batch: this.prodInfo.id,
              }
              this.operationsService.createProdStats(newData)
                .retryWhen(error => this.authAPI.checkHttpRetry(error))
                .subscribe();
   
              
              this.feedbackScoreboard()
            }
            else {
              alert("Both people on shift and amount produced is required")
            }
   
          }
        }
      }
    }
    this.onChange(this.selectedShift, this.shiftDate)
  }
  this.onChange(this.selectedShift, this.shiftDate)*/

  updateFloorstock(event, inputData) {
    this.getTime()
    let results: any = {};

    // Collects all changes and stores as dictionary in the object results
    for (let key in inputData.value) {
      if (typeof inputData.value[key] == 'number') {
        results[key] = inputData.value[key];
      }
    }
    ("ngModelFloorstock: ")
    console.log(this.ngModelFloorstock)
    console.log("results: ")
    console.log(results)
    for (let key in results) {
      let counter = 0;
      for (let obj = 0; obj < this.currentFloorstock.length; obj++) {
        // Checks if time stamp exists. Determines wheter data should be created or updated
        if (this.currentFloorstock[obj]["item_id"] == key && this.currentFloorstock[obj].id != null) {
          let updateItem = {
            id: this.currentFloorstock[obj].id,
            time_stamp: this.todaysDate + 'T' + this.currentTime + 'Z',
            quantity: results[key],
            floorstock_item: key,
            batch: this.prodInfo.id,
          }
          this.operationsService.updateFloorstock(updateItem)
            .retryWhen(error => this.authAPI.checkHttpRetry(error))
            .subscribe();
          this.feedbackFloorstock()

        }
        else {
          counter += 1

          // If no time stamp in api was found this means it is new data
          if (counter == this.currentFloorstock.length) {
            console.log("entered else")
            let createItem = {
              time_stamp: this.todaysDate + 'T' + this.currentTime + 'Z',
              quantity: results[key],
              floorstock_item: key,
              batch: this.prodInfo.id,
            }
            this.operationsService.createFloorstock(createItem)
              .retryWhen(error => this.authAPI.checkHttpRetry(error))
              .subscribe();
            this.getFloorstock()
            if (results.length > 0) {
              this.feedbackFloorstock()
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
      batch: this.prodInfo.id,
    }
    // Add new comment through commentService. Also get all comments in api to be able to count for incrementing id next comment
    if (typeof this.commentName != 'undefined' && typeof this.commentText != 'undefined') {
      this.req_comment = this.commentService.addComment(newComment)
        .retryWhen(error => this.authAPI.checkHttpRetry(error))
        .subscribe(data => { this.getComment() });

      // Triggers notification
      this.commentAdded = true
      setTimeout(() => { this.commentAdded = false }, 4000);
    }
    else {
      alert("Please fill in both name and comment")
    }

    // Resets form
    formData.resetForm()
  }

  feedbackScoreboard() {
    this.scoreboardAdded = true
    setTimeout(() => { this.scoreboardAdded = false }, 4000);
  }

  feedbackFloorstock() {
    this.floorstockAdded = true
    setTimeout(() => { this.floorstockAdded = false }, 4000);
  }

}
