webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-comment/add-comment.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/add-comment/add-comment.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"margin-top:15px;\">\r\n    <h3 class=\"h3header\">\r\n    {{ title }}\r\n  </h3>\r\n  <form class=\"commentForm\">\r\n\r\n    <div class=\"form-group row commentInput\">\r\n        <div class=\"col-lg-2\">\r\n          <label>Name:</label>\r\n        </div>\r\n        <div class=\"col-lg-4\">\r\n          <input type=\"text\" class=\"form-control\">\r\n        </div>\r\n    </div>\r\n\r\n  <div class=\"form-group row\">\r\n    <div class=\"col-lg-2\">\r\n      <label>Comment:</label>\r\n    </div>\r\n    <div class=\"col-lg-4\">\r\n      <textarea type=\"text\" class=\"form-control commentTextarea\" #commentInput></textarea>\r\n    </div>\r\n  </div>\r\n<div class=\"notification is-primary\">\r\n\r\n  <button (click)=\"newMessage(commentInput)\" class=\"btn btn-primary btn-addComment\" routerLink=\"/comments\" routerLinkActive=\"active\">Add comment</button>\r\n\r\n</div>\r\n</form>\r\n\r\n  <!-- <div class=\"btn-finishBatch\">\r\n      <button type=\"submit\" class=\"btn btn-primary  finishBatchLabels\">\r\n        Add comment\r\n      </button>\r\n  </div> \r\n</div> -->\r\n\r\n\r\n  "

/***/ }),

/***/ "./src/app/add-comment/add-comment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCommentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__comment_service_comment_service_service__ = __webpack_require__("./src/app/comment-service/comment-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddCommentComponent = /** @class */ (function () {
    function AddCommentComponent(data) {
        this.data = data;
        this.title = "Add comment";
    }
    AddCommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentMessage.subscribe(function (message) { return _this.message = message; });
    };
    AddCommentComponent.prototype.newMessage = function (commentText) {
        this.data.changeMessage(commentText.value);
    };
    AddCommentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-add-comment',
            template: __webpack_require__("./src/app/add-comment/add-comment.component.html"),
            styles: [__webpack_require__("./src/app/add-comment/add-comment.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__comment_service_comment_service_service__["a" /* CommentServiceService */]])
    ], AddCommentComponent);
    return AddCommentComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Start navBar.-->\r\n\r\n<div class=\"container-fluid\" style=\"margin-top: 1%\" >  \r\n  <div class=\"row\">\r\n    <div class=\"col-lg-2\">\r\n      <div class=\"mycontent-left\">\r\n        <div class=\"jumbotron jumbotron-fluid\">\r\n          <div class=\"container\" >\r\n              <h3>Batch information: </h3>\r\n          </div>    \r\n          <div class=\"container\">\r\n            <current-batch-info></current-batch-info>\r\n            <a class=\"btn btn-primary\" routerLink=\"./start-batch\" >Start new batch</a>\r\n               <!--<div class=\"\">\r\n                  \r\n                <div class=\"nav\">\r\n                    <a class=\"nav-link\" routerLink=\"./start-batch\" routerLinkActive=\"active\">Start new batch</a>\r\n                </div> \r\n              </div> -->\r\n          </div>\r\n        </div>\r\n<!--may need a closing div here... github change-->\r\n        <div class=\"card-fluid\" >\r\n          <ul class=\"nav flex-column nav-pills nav-stacked\">\r\n            <div class=\"border border-dark\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./home\" routerLinkActive=\"active\">Home</a>           \r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./comments\" routerLinkActive=\"active\">Comments</a>           \r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./scoreboard\" routerLinkActive=\"active\">Scoreboard</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./finish-batch\" routerLinkActive=\"active\">Finish batch</a>\r\n              </li>\r\n          </div>\r\n          <br>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./floorstock\" routerLinkActive=\"active\">Floorstock</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./shift-change\" routerLinkActive=\"active\">Shift Change</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./batch-history\" routerLinkActive=\"active\">History</a>\r\n          </li>               \r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n       \r\n<!--End navBar.-->     \r\n\r\n    <div class=\"col-lg-10\" >\r\n      <div class=\"main\">\r\n<!--Router imput here-->\r\n        <router-outlet></router-outlet>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing__ = __webpack_require__("./src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__start_batch_start_batch_component__ = __webpack_require__("./src/app/start-batch/start-batch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__comments_comments_component__ = __webpack_require__("./src/app/comments/comments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scoreboard_scoreboard_component__ = __webpack_require__("./src/app/scoreboard/scoreboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__floorstock_floorstock_component__ = __webpack_require__("./src/app/floorstock/floorstock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shift_change_shift_change_component__ = __webpack_require__("./src/app/shift-change/shift-change.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__batch_history_batch_history_component__ = __webpack_require__("./src/app/batch-history/batch-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__finish_batch_finish_batch_component__ = __webpack_require__("./src/app/finish-batch/finish-batch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__batch_rework_batch_rework_component__ = __webpack_require__("./src/app/batch-rework/batch-rework.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__current_batch_info_current_batch_info_component__ = __webpack_require__("./src/app/current-batch-info/current-batch-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__add_comment_add_comment_component__ = __webpack_require__("./src/app/add-comment/add-comment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__comment_service_comment_service_service__ = __webpack_require__("./src/app/comment-service/comment-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__nav_information_service_nav_information_service_service__ = __webpack_require__("./src/app/nav-information-service/nav-information-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__start_batch_start_batch_component__["a" /* StartBatchComponent */],
                __WEBPACK_IMPORTED_MODULE_8__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__comments_comments_component__["a" /* CommentsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__scoreboard_scoreboard_component__["a" /* ScoreboardComponent */],
                __WEBPACK_IMPORTED_MODULE_11__floorstock_floorstock_component__["a" /* FloorstockComponent */],
                __WEBPACK_IMPORTED_MODULE_12__shift_change_shift_change_component__["a" /* ShiftChangeComponent */],
                __WEBPACK_IMPORTED_MODULE_13__batch_history_batch_history_component__["a" /* BatchHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_14__finish_batch_finish_batch_component__["a" /* FinishBatchComponent */],
                __WEBPACK_IMPORTED_MODULE_15__batch_rework_batch_rework_component__["a" /* BatchReworkComponent */],
                __WEBPACK_IMPORTED_MODULE_16__current_batch_info_current_batch_info_component__["a" /* CurrentBatchInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_17__add_comment_add_comment_component__["a" /* AddCommentComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6__app_routing__["a" /* AppRoutingModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_19__nav_information_service_nav_information_service_service__["a" /* NavInformationServiceService */], __WEBPACK_IMPORTED_MODULE_18__comment_service_comment_service_service__["a" /* CommentServiceService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__batch_history_batch_history_component__ = __webpack_require__("./src/app/batch-history/batch-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comments_comments_component__ = __webpack_require__("./src/app/comments/comments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__current_batch_info_current_batch_info_component__ = __webpack_require__("./src/app/current-batch-info/current-batch-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__floorstock_floorstock_component__ = __webpack_require__("./src/app/floorstock/floorstock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scoreboard_scoreboard_component__ = __webpack_require__("./src/app/scoreboard/scoreboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shift_change_shift_change_component__ = __webpack_require__("./src/app/shift-change/shift-change.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__start_batch_start_batch_component__ = __webpack_require__("./src/app/start-batch/start-batch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__finish_batch_finish_batch_component__ = __webpack_require__("./src/app/finish-batch/finish-batch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__batch_rework_batch_rework_component__ = __webpack_require__("./src/app/batch-rework/batch-rework.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__add_comment_add_comment_component__ = __webpack_require__("./src/app/add-comment/add-comment.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//https://angular.io/guide/router













var appRoutes = [
    {
        path: "",
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: "batch-history",
        component: __WEBPACK_IMPORTED_MODULE_2__batch_history_batch_history_component__["a" /* BatchHistoryComponent */],
    },
    {
        path: "running-batch",
        component: __WEBPACK_IMPORTED_MODULE_4__current_batch_info_current_batch_info_component__["a" /* CurrentBatchInfoComponent */],
    },
    {
        path: "comments",
        component: __WEBPACK_IMPORTED_MODULE_3__comments_comments_component__["a" /* CommentsComponent */],
    },
    {
        path: "floorstock",
        component: __WEBPACK_IMPORTED_MODULE_5__floorstock_floorstock_component__["a" /* FloorstockComponent */],
    },
    {
        path: "home",
        component: __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */],
    },
    {
        path: "scoreboard",
        component: __WEBPACK_IMPORTED_MODULE_7__scoreboard_scoreboard_component__["a" /* ScoreboardComponent */],
    },
    {
        path: "shift-change",
        component: __WEBPACK_IMPORTED_MODULE_8__shift_change_shift_change_component__["a" /* ShiftChangeComponent */],
    },
    {
        path: "start-batch",
        component: __WEBPACK_IMPORTED_MODULE_9__start_batch_start_batch_component__["a" /* StartBatchComponent */],
    },
    {
        path: "finish-batch",
        component: __WEBPACK_IMPORTED_MODULE_10__finish_batch_finish_batch_component__["a" /* FinishBatchComponent */],
    },
    {
        path: "batch-rework",
        component: __WEBPACK_IMPORTED_MODULE_11__batch_rework_batch_rework_component__["a" /* BatchReworkComponent */],
    },
    {
        path: "comments/add-comment",
        component: __WEBPACK_IMPORTED_MODULE_12__add_comment_add_comment_component__["a" /* AddCommentComponent */],
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/batch-history/batch-history.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/batch-history/batch-history.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n    <div class=\"card-group\">\r\n            <div class=\"card\">\r\n                <div class=\"card-body align-items-center d-flex justify-content-center\">\r\n                    <h5 class=\"card-title\"># Batch</h5>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"card card card-block d-flex\">                \r\n              <div class=\"card-body align-items-center\">\r\n                <h5 class=\"card-title d-flex justify-content-center \">Information</h5>  \r\n                   <div class=\"d-flex justify-content-center\">\r\n                    <ul>\r\n                        <li>\r\n                            Start/stop Time         \r\n                        </li>\r\n                        <li >\r\n                            Units produced      \r\n                        </li>\r\n                        <li>\r\n                            Product number      \r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            \r\n            <div class=\"card text-center\">\r\n              <div class=\"card-body card-body align-items-center d-flex justify-content-center\">\r\n               \r\n                <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"card-group\">\r\n                <div class=\"card\">\r\n                    <div class=\"card-body align-items-center d-flex justify-content-center\">\r\n                        <h5 class=\"card-title\"># Batch</h5>\r\n                    </div>\r\n                </div>\r\n    \r\n                <div class=\"card card card-block d-flex\">                \r\n                  <div class=\"card-body align-items-center\">\r\n                    <h5 class=\"card-title d-flex justify-content-center \">Information</h5>  \r\n                       <div class=\"d-flex justify-content-center\">\r\n                        <ul>\r\n                            <li>\r\n                                Start/stop Time         \r\n                            </li>\r\n                            <li >\r\n                                Units produced      \r\n                            </li>\r\n                            <li>\r\n                                Product number      \r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                \r\n                <div class=\"card text-center\">\r\n                  <div class=\"card-body card-body align-items-center d-flex justify-content-center\">\r\n                   \r\n                    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n    \r\n              <div class=\"card-group\">\r\n                    <div class=\"card\">\r\n                        <div class=\"card-body align-items-center d-flex justify-content-center\">\r\n                            <h5 class=\"card-title\"># Batch</h5>\r\n                        </div>\r\n                    </div>\r\n        \r\n                    <div class=\"card card card-block d-flex\">                \r\n                      <div class=\"card-body align-items-center\">\r\n                        <h5 class=\"card-title d-flex justify-content-center \">Information</h5>  \r\n                           <div class=\"d-flex justify-content-center\">\r\n                            <ul>\r\n                                <li>\r\n                                    Start/stop Time         \r\n                                </li>\r\n                                <li >\r\n                                    Units produced      \r\n                                </li>\r\n                                <li>\r\n                                    Product number      \r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    \r\n                    <div class=\"card text-center\">\r\n                      <div class=\"card-body card-body align-items-center d-flex justify-content-center\">\r\n                       \r\n                        <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n        \r\n            \r\n"

/***/ }),

/***/ "./src/app/batch-history/batch-history.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BatchHistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BatchHistoryComponent = /** @class */ (function () {
    function BatchHistoryComponent() {
    }
    BatchHistoryComponent.prototype.ngOnInit = function () {
    };
    BatchHistoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-batch-history',
            template: __webpack_require__("./src/app/batch-history/batch-history.component.html"),
            styles: [__webpack_require__("./src/app/batch-history/batch-history.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BatchHistoryComponent);
    return BatchHistoryComponent;
}());



/***/ }),

/***/ "./src/app/batch-rework/batch-rework.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/batch-rework/batch-rework.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"margin-top:15px;\">\r\n  <h3 class=\"h3header\">\r\n    {{ title }}\r\n  </h3>\r\n  <br>\r\n  <div class=\"finishBatch\">\r\n  <div class=\"row\" style=\"margin-top:20px;\">\r\n    <h5 class=\"col-lg-6\">\r\n      {{ groninger1 }}\r\n    </h5>\r\n    <h5 class=\"col-lg-6\">\r\n        {{ groninger2 }}\r\n    </h5>\r\n  </div>\r\n  <form #batchEndForm='ngForm' (ngSubmit)='submitEndBatch($event,batchEndForm)'>\r\n  \r\n    <div class=\"form-group row firstInput\">\r\n      <div class=\"col-lg-4\">\r\n        <input type=\"total\" class=\"form-control\">\r\n      </div>\r\n      <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Total</label>\r\n      <div class=\"col-lg-4\">\r\n          <input type=\"total\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"form-group row firstInput\">\r\n        <div class=\"col-lg-4\">\r\n          <input type=\"approved\" class=\"form-control\">\r\n        </div>\r\n        <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Approved/Good</label>\r\n        <div class=\"col-lg-4\">\r\n            <input type=\"approved\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"form-group row firstInput\">\r\n          <div class=\"col-lg-4\">\r\n            <input type=\"rejected\" class=\"form-control\">\r\n          </div>\r\n          <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Rejected/Bad</label>\r\n          <div class=\"col-lg-4\">\r\n              <input type=\"rejected\" class=\"form-control\">\r\n          </div>\r\n        </div>  \r\n\r\n        <div class=\"form-group firstInput row yieldField\">\r\n          <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Yield</label>\r\n          <div class=\"col-lg-4\">\r\n            <input type=\"yield\" class=\"form-control\">\r\n          </div> \r\n        </div>  \r\n\r\n      <div class=\"btn-finishBatch\">\r\n        <button type=\"submit\" class=\"btn btn-primary  finishBatchLabels\" routerLink=\"/batch-rework\" routerLinkActive=\"active\">\r\n          Update\r\n        </button>\r\n        <button type=\"submit\" class=\"btn btn-secondary finishBatchLabels\">\r\n          Cancel\r\n        </button>\r\n      </div>\r\n  </form>\r\n</div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/batch-rework/batch-rework.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BatchReworkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BatchReworkComponent = /** @class */ (function () {
    function BatchReworkComponent() {
        this.title = "Rework batch";
        this.groninger1 = "Final HMI Data Groninger 1";
        this.groninger2 = "Final HMI Data Groninger 2";
    }
    BatchReworkComponent.prototype.ngOnInit = function () {
    };
    BatchReworkComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-batch-rework',
            template: __webpack_require__("./src/app/batch-rework/batch-rework.component.html"),
            styles: [__webpack_require__("./src/app/batch-rework/batch-rework.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BatchReworkComponent);
    return BatchReworkComponent;
}());



/***/ }),

/***/ "./src/app/comment-service/comment-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentServiceService = /** @class */ (function () {
    function CommentServiceService() {
        this.messageSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]("");
        this.currentMessage = this.messageSource.asObservable();
    }
    CommentServiceService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    CommentServiceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], CommentServiceService);
    return CommentServiceService;
}());



/***/ }),

/***/ "./src/app/comments/comments.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/comments/comments.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"margin-top:15px;\">\r\n  <h3 class=\"mainTitleComments\">\r\n  {{ mainTitle }}\r\n</h3>\r\n<h5 class=\"addCommentTitle\">\r\n  {{ addCommentTitle }}\r\n</h5>\r\n<form class=\"commentForm\">\r\n\r\n  <div class=\"form-group row commentInput\">\r\n      <div class=\"col-lg-2\">\r\n        <label>Name:</label>\r\n      </div>\r\n      <div class=\"col-lg-4\">\r\n        <input type=\"text\" class=\"form-control\">\r\n      </div>\r\n  </div>\r\n\r\n<div class=\"form-group row\">\r\n  <div class=\"col-lg-2\">\r\n    <label>Comment:</label>\r\n  </div>\r\n  <div class=\"col-lg-4\">\r\n    <textarea type=\"text\" class=\"form-control commentTextarea\" #commentInput></textarea>\r\n  </div>\r\n</div>\r\n<div class=\"notification is-primary\">\r\n\r\n<button (click)=\"newCommentText(commentInput)\" class=\"btn btn-primary btn-addComment\">Add comment</button>\r\n\r\n</div>\r\n</form>\r\n\r\n\r\n<div class=\"text-center\" style=\"margin-top:15px;\">\r\n  <h5 class=\"commentListTitle\">\r\n    {{ commentListTitle }}\r\n  </h5>\r\n    <div class=\"col-lg-12 text-left notification is-primary commentList\">\r\n      {{ message }}\r\n    </div>\r\n\r\n  </div>\r\n\r\n"

/***/ }),

/***/ "./src/app/comments/comments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__comment_service_comment_service_service__ = __webpack_require__("./src/app/comment-service/comment-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(data) {
        this.data = data;
        this.mainTitle = "Comments";
        this.addCommentTitle = "Add comment";
        this.commentListTitle = "Comments list";
    }
    CommentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentMessage.subscribe(function (message) { return _this.message = message; });
    };
    CommentsComponent.prototype.newCommentText = function (commentText) {
        console.log(commentText.value);
        this.data.changeMessage(commentText.value);
    };
    CommentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-comments',
            template: __webpack_require__("./src/app/comments/comments.component.html"),
            styles: [__webpack_require__("./src/app/comments/comments.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__comment_service_comment_service_service__["a" /* CommentServiceService */]])
    ], CommentsComponent);
    return CommentsComponent;
}());



/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div *ngIf=\"currentBatchInfo !==null\">\r\n    <p>Order ID: {{ currentBatchInfo.batchNr }}</p>\r\n    <p>Batch number: {{ currentBatchInfo.orderNr }}</p>\r\n</div>"

/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentBatchInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_information_service_nav_information_service_service__ = __webpack_require__("./src/app/nav-information-service/nav-information-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CurrentBatchInfoComponent = /** @class */ (function () {
    function CurrentBatchInfoComponent(route, data) {
        this.route = route;
        this.data = data;
    }
    CurrentBatchInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentBatchObservable.subscribe(function (currentBatchInfo) { return _this.currentBatchInfo = currentBatchInfo; });
        this.routeSub = this.route.params.subscribe(function (params) {
            //this.batchInfo = params  //not sure about var name, will change
            _this.batchnr = params.batchnr;
            _this.ordernr = params.ordernr;
        });
        this.batchInfo = true; //just a temporary thing
        console.log(this.batchnr);
        console.log(this.ordernr);
    };
    CurrentBatchInfoComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
        // this.currentBatchObservable.unsubscribe() // I cant do this but want to.. how?
    };
    CurrentBatchInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'current-batch-info',
            template: __webpack_require__("./src/app/current-batch-info/current-batch-info.component.html"),
            styles: [__webpack_require__("./src/app/current-batch-info/current-batch-info.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__nav_information_service_nav_information_service_service__["a" /* NavInformationServiceService */]])
    ], CurrentBatchInfoComponent);
    return CurrentBatchInfoComponent;
}());



/***/ }),

/***/ "./src/app/finish-batch/finish-batch.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/finish-batch/finish-batch.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"margin-top:15px;\">\r\n      <h3 class=\"h3header\">\r\n      {{ title }}\r\n    </h3>\r\n    <br>\r\n    <div class=\"finishBatch\">\r\n    <div class=\"row\" style=\"margin-top:20px;\">\r\n      <h5 class=\"col-lg-6\">\r\n        {{ groninger1 }}\r\n      </h5>\r\n      <h5 class=\"col-lg-6\">\r\n          {{ groninger2 }}\r\n      </h5>\r\n    </div>\r\n    <form #batchEndForm='ngForm' (ngSubmit)='submitEndBatch($event,batchEndForm)'>\r\n    \r\n      <div class=\"form-group row firstInput\">\r\n        <div class=\"col-lg-4\">\r\n          <input type=\"total\" class=\"form-control\">\r\n        </div>\r\n        <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Total</label>\r\n        <div class=\"col-lg-4\">\r\n            <input type=\"total\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"form-group row firstInput\">\r\n          <div class=\"col-lg-4\">\r\n            <input type=\"approved\" class=\"form-control\">\r\n          </div>\r\n          <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Approved/Good</label>\r\n          <div class=\"col-lg-4\">\r\n              <input type=\"approved\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"form-group row firstInput\">\r\n            <div class=\"col-lg-4\">\r\n              <input type=\"rejected\" class=\"form-control\">\r\n            </div>\r\n            <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Rejected/Bad</label>\r\n            <div class=\"col-lg-4\">\r\n                <input type=\"rejected\" class=\"form-control\">\r\n            </div>\r\n          </div>  \r\n      \r\n          <div class=\"form-group row firstInput border border-secondary col-lg-6\" style=\"margin-top:50px; margin-left:97px;\">\r\n              <label for=\"inputTotal\" class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Re-labeling</label>\r\n              <div style=\"margin-top:7px;\">\r\n              <div class=\"form-check form-check-inline\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\">\r\n                  <label class=\"form-check-label finishBatchLabels\" for=\"inlineCheckbox1\">Yes</label>\r\n                </div>\r\n                <div class=\"form-check form-check-inline\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox2\" value=\"option2\">\r\n                  <label class=\"form-check-label finishBatchLabels\" for=\"inlineCheckbox2\">No</label>\r\n                </div>\r\n              </div>\r\n            </div>  \r\n\r\n            <div class=\"form-group firstInput row yieldField\">\r\n              <label class=\"col-lg-4 col-form-label text-center finishBatchLabels\">Yield</label>\r\n              <div class=\"col-lg-4\">\r\n                <input type=\"yield\" class=\"form-control\">\r\n              </div> \r\n            </div> \r\n\r\n        <div class=\"btn-finishBatch\">\r\n          <button type=\"submit\" class=\"btn btn-primary  finishBatchLabels\" routerLink=\"/batch-rework\" routerLinkActive=\"active\">\r\n            Update\r\n          </button>\r\n          <button type=\"submit\" class=\"btn btn-secondary finishBatchLabels\">\r\n            Cancel\r\n          </button>\r\n        </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/finish-batch/finish-batch.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinishBatchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FinishBatchComponent = /** @class */ (function () {
    function FinishBatchComponent() {
        this.title = "Finish batch";
        this.groninger1 = "Final HMI Data Groninger 1";
        this.groninger2 = "Final HMI Data Groninger 2";
    }
    FinishBatchComponent.prototype.ngOnInit = function () {
    };
    FinishBatchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-finish-batch',
            template: __webpack_require__("./src/app/finish-batch/finish-batch.component.html"),
            styles: [__webpack_require__("./src/app/finish-batch/finish-batch.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FinishBatchComponent);
    return FinishBatchComponent;
}());



/***/ }),

/***/ "./src/app/floorstock/floorstock.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/floorstock/floorstock.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>\r\n    <i>Examples of content on this page:</i>\r\n</h2>\r\n    \r\n<br>\r\n<h4>\r\n    *Copy of current Excel layout.\r\n</h4>\r\n<p>\r\n    List of recent activity when retreiving floorstock materials. How does this relate to other parts of the system? \r\n</p>\r\n\r\n<br>\r\n<h4>\r\n    *Material change per batch\r\n</h4>\r\n<p>\r\n    Track what floorstock materials that has been changed per batch, and the date for when this occured. Is this a necessary feature?\r\n</p>\r\n\r\n<br>\r\n<h4>\r\n    *Inventory/stock info\r\n</h4>\r\n<p>\r\n    Sort of like an inventory to show what is in stock at the moment. Again, is this a necessary feature?\r\n    This assumes floorstock materials is not tracked by SAP.\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/floorstock/floorstock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FloorstockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FloorstockComponent = /** @class */ (function () {
    function FloorstockComponent() {
    }
    FloorstockComponent.prototype.ngOnInit = function () {
    };
    FloorstockComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-floorstock',
            template: __webpack_require__("./src/app/floorstock/floorstock.component.html"),
            styles: [__webpack_require__("./src/app/floorstock/floorstock.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FloorstockComponent);
    return FloorstockComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Sidebar</h2>\r\n<hr>\r\n<p>\r\n  Batch number: <b>{{ batchnr }}</b>\r\n</p>\r\n<p>\r\n  Order number: <b>{{ ordernr }}</b>\r\n</p>\r\n\r\n<h2>\r\n  <i>Examples of content on this page:</i>\r\n</h2>\r\n\r\n<br>\r\n<h4>\r\n  *Current Batch Details.\r\n</h4>\r\n<p>\r\n  All info for current batch. Yield, Scrap, HMI output, labels used etc. Ability to enter more data for the batch. \r\n  Should operators be able to enter data for a batch <b>during</b> production of a batch or only when the batch is finished?  \r\n</p>\r\n\r\n<br>\r\n<h4>\r\n  *VFAL output statistics.\r\n</h4>\r\n<p>\r\n  Current production output over time in a graph. Compare with expected output.\r\n</p>\r\n\r\n<br>\r\n<h4>\r\n  *Message box.\r\n</h4>\r\n<p>\r\n    Manager/planner can communicate with operators through this message box. Sort of like a chat, with notification when there is an unread message.\r\n</p>\r\n\r\n<br>\r\n<h4>\r\n  *Comments.\r\n</h4>\r\n<p>\r\n  Put comments section on this page instead. Add and view comment history on this page. \r\n</p>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(route) {
        this.route = route;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/nav-information-service/nav-information-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavInformationServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavInformationServiceService = /** @class */ (function () {
    function NavInformationServiceService() {
        this.currentBatchSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
        this.currentBatchObservable = this.currentBatchSource.asObservable();
    }
    NavInformationServiceService.prototype.changeBatchInfo = function (obj) {
        this.currentBatchSource.next(obj);
    };
    NavInformationServiceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], NavInformationServiceService);
    return NavInformationServiceService;
}());



/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>\r\n    <i>Examples of content on this page:</i>\r\n</h2>\r\n\r\n<br>\r\n<h4>\r\n    *Copy of current Excel layout.\r\n</h4>\r\n<p>\r\n    Current batch Scoreboard. Ability to enter output per hour. Or should this be done in the home view? What is best for operators? \r\n    Also, maybe past batches scoreboard for comparision.\r\n</p>\r\n\r\n<br>\r\n<h4>\r\n    *Input for current batch + statistics.\r\n</h4>\r\n<p>\r\n    Ability to input output per hour of current batch. Visualize this in a graph compared to expected output. \r\n</p>\r\n"

/***/ }),

/***/ "./src/app/scoreboard/scoreboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScoreboardComponent = /** @class */ (function () {
    function ScoreboardComponent() {
    }
    ScoreboardComponent.prototype.ngOnInit = function () {
    };
    ScoreboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-scoreboard',
            template: __webpack_require__("./src/app/scoreboard/scoreboard.component.html"),
            styles: [__webpack_require__("./src/app/scoreboard/scoreboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ScoreboardComponent);
    return ScoreboardComponent;
}());



/***/ }),

/***/ "./src/app/shift-change/shift-change.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shift-change/shift-change.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>\r\n    <i>Examples of content on this page:</i>\r\n</h2>\r\n    \r\n<br>\r\n<h4>\r\n    *Copy of current Excel layout.\r\n</h4>\r\n<p>\r\n    Ability to input people on shift per hour and list of shift-changes for previous batches. \r\n    Is the list of past shift-changes really relevant for operators to see though?\r\n</p>\r\n\r\n<br>\r\n<h4>\r\n    *Combine with scoreboard?\r\n</h4>\r\n<p>\r\n    Ability to input scoreboard output per hour and number of people on shift per hour in same view. \r\n    Combine the two together since both track changes in production per hour. \r\n    Create some sort of info page that displays information of current batch per hour (# people on shift, production output etc.)\r\n</p>"

/***/ }),

/***/ "./src/app/shift-change/shift-change.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShiftChangeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShiftChangeComponent = /** @class */ (function () {
    function ShiftChangeComponent() {
    }
    ShiftChangeComponent.prototype.ngOnInit = function () {
    };
    ShiftChangeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-shift-change',
            template: __webpack_require__("./src/app/shift-change/shift-change.component.html"),
            styles: [__webpack_require__("./src/app/shift-change/shift-change.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ShiftChangeComponent);
    return ShiftChangeComponent;
}());



/***/ }),

/***/ "./src/app/start-batch/start-batch.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/start-batch/start-batch.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\">\r\n<h3 class=\"h3Header\">\r\n  {{ title }}\r\n</h3>\r\n<br>\r\n<form #batchForm='ngForm' (ngSubmit)='submitBatch($event,batchForm)'>\r\n\r\n  <div class=\"form-group row\">\r\n      <label for=\"inputOrderNr\" class=\"col-lg-4 col-form-label text-right\">Add order</label>\r\n      <div class=\"col-lg-4\">\r\n      <input type=\"text\" class=\"form-control\" id=\"inputOrderNr\" placeholder=\"Order number\" name='ordernr' [(ngModel)]='newOrder'>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group row\">\r\n      <label for=\"inputProductNr\" class=\"col-lg-4 col-form-label text-right\">Add product</label>\r\n      <div class=\"col-lg-4 dropdown\">\r\n          <button class=\"btn btn-secondary btn-block dropdown-toggle\" type=\"button\" id=\"dropdownProductButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n              Product number\r\n            </button>\r\n            <div class=\"dropdown-menu\"  aria-labelledby=\"dropdownProductButton\">\r\n                <a class=\"dropdown-item\" >123</a>\r\n                <a class=\"dropdown-item\" >456</a>\r\n                <a class=\"dropdown-item\" >789</a>\r\n              </div>\r\n      </div>\r\n    </div>\r\n \r\n\r\n  <div class=\"form-group row\">\r\n      <label for=\"inputBatchNr\" class=\"col-lg-4 col-form-label text-right\">Add batch</label>\r\n      <div class=\"col-lg-4\">\r\n      <input type=\"batch\" class=\"form-control\" id=\"inputBatchNr\" placeholder=\"Batch number\" name='batchnr' [(ngModel)]='newBatch'>\r\n    </div>\r\n    </div>  \r\n  \r\n    <button type=\"submit\" class=\"btn btn-default btn-startBatch\">\r\n    Start batch\r\n  </button>\r\n\r\n</form>\r\n</div>\r\n\r\n<hr>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/start-batch/start-batch.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartBatchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_information_service_nav_information_service_service__ = __webpack_require__("./src/app/nav-information-service/nav-information-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StartBatchComponent = /** @class */ (function () {
    function StartBatchComponent(router, data) {
        this.router = router;
        this.data = data;
        this.title = "Start new batch";
    }
    StartBatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentBatchObservable.subscribe(function (currentBatchInfo) { return _this.currentBatchInfo = currentBatchInfo; });
        console.log(this.passedQuery);
        if (this.passedQuery) {
            this.newBatch = this.passedQuery;
        }
    };
    StartBatchComponent.prototype.ngOnDestroy = function () {
        // this.currentBatchObservable.usubscribe() // I want to do this but cant
    };
    StartBatchComponent.prototype.newBatchInformation = function (obj) {
        this.data.changeBatchInfo(obj);
    };
    StartBatchComponent.prototype.submitBatch = function (event, formData) {
        var chosenBatch = formData.value['batchnr'];
        var chosenOrder = formData.value['ordernr'];
        if (chosenBatch && chosenOrder) {
            this.newBatchInformation({ batchNr: chosenBatch, orderNr: chosenOrder });
            this.router.navigate(['./home']);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], StartBatchComponent.prototype, "passedQuery", void 0);
    StartBatchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'start-batch',
            template: __webpack_require__("./src/app/start-batch/start-batch.component.html"),
            styles: [__webpack_require__("./src/app/start-batch/start-batch.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__nav_information_service_nav_information_service_service__["a" /* NavInformationServiceService */]])
    ], StartBatchComponent);
    return StartBatchComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map