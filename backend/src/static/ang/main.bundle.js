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

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Start navBar.-->\r\n\r\n<div class=\"container-fluid\" style=\"margin-top: 1%\" >  \r\n  <div class=\"row\">\r\n    <div class=\"col-lg-2\">\r\n      <div class=\"mycontent-left\">\r\n        <div class=\"jumbotron jumbotron-fluid\">\r\n          <div class=\"container\" >\r\n              <h3>Batch information: </h3>\r\n          </div>    \r\n          <div class=\"container\">\r\n            <current-batch-info></current-batch-info>\r\n\r\n               <!--<div class=\"\">\r\n                  \r\n                <div class=\"nav\">\r\n                    <a class=\"nav-link\" routerLink=\"./start-batch\" routerLinkActive=\"active\">Start new batch</a>\r\n                </div> \r\n              </div> -->\r\n          </div>\r\n        </div>\r\n<!--may need a closing div here... github change-->\r\n        <div class=\"card-fluid\" >\r\n          <ul class=\"nav flex-column nav-pills nav-stacked\">\r\n            <div class=\"border border-dark\">\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./home\" routerLinkActive=\"active\">Home</a>           \r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./comments\" routerLinkActive=\"active\">Comments</a>           \r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./scoreboard\" routerLinkActive=\"active\">Scoreboard</a>\r\n              </li>\r\n              <!-- <li class=\"nav-item\">\r\n                <a class=\"nav-link\" routerLink=\"./finish-batch\" routerLinkActive=\"active\">Finish batch</a>\r\n              </li> -->\r\n          </div>\r\n          <br>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./floorstock\" routerLinkActive=\"active\">Floorstock</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./shift-change\" routerLinkActive=\"active\">Shift Change</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" routerLink=\"./batch-history\" routerLinkActive=\"active\">History</a>\r\n          </li>               \r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n       \r\n<!--End navBar.-->     \r\n\r\n    <div class=\"col-lg-10\" >\r\n      <div class=\"main\">\r\n<!--Router imput here-->\r\n        <router-outlet></router-outlet>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var http_2 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var app_routing_1 = __webpack_require__("./src/app/app.routing.ts");
var start_batch_component_1 = __webpack_require__("./src/app/start-batch/start-batch.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var comments_component_1 = __webpack_require__("./src/app/comments/comments.component.ts");
var scoreboard_component_1 = __webpack_require__("./src/app/scoreboard/scoreboard.component.ts");
var floorstock_component_1 = __webpack_require__("./src/app/floorstock/floorstock.component.ts");
var shift_change_component_1 = __webpack_require__("./src/app/shift-change/shift-change.component.ts");
var batch_history_component_1 = __webpack_require__("./src/app/batch-history/batch-history.component.ts");
var finish_batch_component_1 = __webpack_require__("./src/app/finish-batch/finish-batch.component.ts");
var batch_rework_component_1 = __webpack_require__("./src/app/batch-rework/batch-rework.component.ts");
var current_batch_info_component_1 = __webpack_require__("./src/app/current-batch-info/current-batch-info.component.ts");
var comment_service_service_1 = __webpack_require__("./src/app/comment-service/comment-service.service.ts");
var operations_service_1 = __webpack_require__("./src/app/operations.service.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                start_batch_component_1.StartBatchComponent,
                home_component_1.HomeComponent,
                comments_component_1.CommentsComponent,
                scoreboard_component_1.ScoreboardComponent,
                floorstock_component_1.FloorstockComponent,
                shift_change_component_1.ShiftChangeComponent,
                batch_history_component_1.BatchHistoryComponent,
                finish_batch_component_1.FinishBatchComponent,
                batch_rework_component_1.BatchReworkComponent,
                current_batch_info_component_1.CurrentBatchInfoComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                app_routing_1.AppRoutingModule
            ],
            providers: [comment_service_service_1.CommentServiceService, operations_service_1.OperationsService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/app.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://angular.io/guide/router
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var batch_history_component_1 = __webpack_require__("./src/app/batch-history/batch-history.component.ts");
var comments_component_1 = __webpack_require__("./src/app/comments/comments.component.ts");
var current_batch_info_component_1 = __webpack_require__("./src/app/current-batch-info/current-batch-info.component.ts");
var floorstock_component_1 = __webpack_require__("./src/app/floorstock/floorstock.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var scoreboard_component_1 = __webpack_require__("./src/app/scoreboard/scoreboard.component.ts");
var shift_change_component_1 = __webpack_require__("./src/app/shift-change/shift-change.component.ts");
var start_batch_component_1 = __webpack_require__("./src/app/start-batch/start-batch.component.ts");
var finish_batch_component_1 = __webpack_require__("./src/app/finish-batch/finish-batch.component.ts");
var batch_rework_component_1 = __webpack_require__("./src/app/batch-rework/batch-rework.component.ts");
var appRoutes = [
    {
        path: "",
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: "batch-history",
        component: batch_history_component_1.BatchHistoryComponent,
    },
    {
        path: "running-batch",
        component: current_batch_info_component_1.CurrentBatchInfoComponent,
    },
    {
        path: "comments",
        component: comments_component_1.CommentsComponent,
    },
    {
        path: "floorstock",
        component: floorstock_component_1.FloorstockComponent,
    },
    {
        path: "home",
        component: home_component_1.HomeComponent,
    },
    {
        path: "scoreboard",
        component: scoreboard_component_1.ScoreboardComponent,
    },
    {
        path: "shift-change",
        component: shift_change_component_1.ShiftChangeComponent,
    },
    {
        path: "start-batch",
        component: start_batch_component_1.StartBatchComponent,
    },
    {
        path: "finish-batch",
        component: finish_batch_component_1.FinishBatchComponent,
    },
    {
        path: "batch-rework",
        component: batch_rework_component_1.BatchReworkComponent,
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var BatchHistoryComponent = /** @class */ (function () {
    function BatchHistoryComponent() {
    }
    BatchHistoryComponent.prototype.ngOnInit = function () {
    };
    BatchHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-batch-history',
            template: __webpack_require__("./src/app/batch-history/batch-history.component.html"),
            styles: [__webpack_require__("./src/app/batch-history/batch-history.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BatchHistoryComponent);
    return BatchHistoryComponent;
}());
exports.BatchHistoryComponent = BatchHistoryComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var BatchReworkComponent = /** @class */ (function () {
    function BatchReworkComponent() {
        this.title = "Rework batch";
        this.groninger1 = "Final HMI Data Groninger 1";
        this.groninger2 = "Final HMI Data Groninger 2";
    }
    BatchReworkComponent.prototype.ngOnInit = function () {
    };
    BatchReworkComponent = __decorate([
        core_1.Component({
            selector: 'app-batch-rework',
            template: __webpack_require__("./src/app/batch-rework/batch-rework.component.html"),
            styles: [__webpack_require__("./src/app/batch-rework/batch-rework.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BatchReworkComponent);
    return BatchReworkComponent;
}());
exports.BatchReworkComponent = BatchReworkComponent;


/***/ }),

/***/ "./src/app/comment-service/comment-service.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var CommentServiceService = /** @class */ (function () {
    function CommentServiceService() {
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("");
        this.currentMessage = this.messageSource.asObservable();
    }
    CommentServiceService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    CommentServiceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommentServiceService);
    return CommentServiceService;
}());
exports.CommentServiceService = CommentServiceService;


/***/ }),

/***/ "./src/app/comments/comments.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/comments/comments.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"margin-top:15px;\">\r\n  <h3 class=\"mainTitleComments\">\r\n  {{ mainTitle }}\r\n</h3>\r\n<h5 class=\"addCommentTitle\">\r\n  {{ addCommentTitle }}\r\n</h5>\r\n<form class=\"commentForm\">\r\n\r\n  <div class=\"form-group row commentInput\">\r\n      <div class=\"col-lg-2\">\r\n        <label>Name:</label>\r\n      </div>\r\n      <div class=\"col-lg-4\">\r\n        <input type=\"text\" class=\"form-control\">\r\n      </div>\r\n  </div>\r\n\r\n<div class=\"form-group row\">\r\n  <div class=\"col-lg-2\">\r\n    <label>Comment:</label>\r\n  </div>\r\n  <div class=\"col-lg-4\">\r\n    <textarea type=\"text\" class=\"form-control commentTextarea\" #newComment\r\n    (keyup.enter)=\"addComment(newComment.value)\"\r\n    (blur)=\"addComment(newComment.value); newComment.value='' \" name='comment'></textarea>\r\n  </div>\r\n</div>\r\n<div class=\"notification is-primary\">\r\n\r\n<button (click)=\"addComment(newComment.value)\" class=\"btn btn-primary btn-addComment\">Add comment</button>\r\n\r\n</div>\r\n</form>\r\n\r\n\r\n<div class=\"text-center\" style=\"margin-top:15px;\">\r\n  <h5 class=\"commentListTitle\">\r\n    {{ commentListTitle }}\r\n  </h5>\r\n    <div class=\"col-lg-12 text-left notification is-primary commentList\">\r\n        <ul><li *ngFor=\"let comment of comments\"><b>{{dateNow | date: 'M/d/yy, H:mm a'}}</b> - {{comment}}</li></ul>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <hr>\r\n  <p>hdauilfrhwehfuiodasfsdafasdfdfasdfasfperthj gr8op</p>\r\n\r\n  <button (click)='getPosts()' class=\"btn btn-primary btn-addComment\">run get</button>\r\n <div *ngFor=\"let post of posts | async\">\r\n   {{ post.text_comment | json }}\r\n </div>"

/***/ }),

/***/ "./src/app/comments/comments.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var comment_service_service_1 = __webpack_require__("./src/app/comment-service/comment-service.service.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(data, http) {
        this.data = data;
        this.http = http;
        this.mainTitle = "Comments";
        this.addCommentTitle = "Add comment";
        this.commentListTitle = "Comments list";
        this.comments = [];
        this.dateNow = new Date();
        this.ROUTE_URL = 'http://localhost:8000/api/operations/comment/';
    }
    CommentsComponent.prototype.getPosts = function () {
        this.posts = this.http.get(this.ROUTE_URL);
    };
    CommentsComponent.prototype.ngOnInit = function () {
    };
    CommentsComponent.prototype.addComment = function (newComment) {
        if (newComment === void 0) { newComment = []; }
        console.log(Date);
        if (newComment) {
            this.comments.push(newComment);
        }
    };
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'app-comments',
            template: __webpack_require__("./src/app/comments/comments.component.html"),
            styles: [__webpack_require__("./src/app/comments/comments.component.css")],
        }),
        __metadata("design:paramtypes", [comment_service_service_1.CommentServiceService, http_1.HttpClient])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;


/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"prodActive; then pActive else pStop\"></div>\r\n\r\n<ng-template #pActive>\r\n    <p>Order ID: {{ prodInfo.order }}</p>\r\n    <p>Batch number: {{ prodInfo.batch }}</p>\r\n    <a class=\"btn btn-primary\" routerLink=\"./finish-batch\">Finish batch</a>\r\n</ng-template>\r\n\r\n<ng-template #pStop>\r\n    <a class=\"btn btn-primary\" routerLink=\"./start-batch\">Start Batch</a>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/current-batch-info/current-batch-info.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var operations_service_1 = __webpack_require__("./src/app/operations.service.ts");
var CurrentBatchInfoComponent = /** @class */ (function () {
    function CurrentBatchInfoComponent(route, data) {
        this.route = route;
        this.data = data;
    }
    CurrentBatchInfoComponent.prototype.ngOnInit = function () {
        //TODO: Use HTTP.get() to fetch last batch from DB. If it is missing an end-date, set prodActive to true. Else set to false.
        // Is this really a valid way to check if a batch is running? 
        //Better to add attribute 'active' to batch model and check DB is there is an active batch running. This gives us the ability to pause a batch.
        var _this = this;
        //Use operationsService to share information between start-batch, finish-batch and current-batch-info
        this.data.prodActiveObservable.subscribe(function (active) { return _this.prodActive = active; });
        this.data.prodInfoObservable.subscribe(function (info) { return _this.prodInfo = info; });
    };
    CurrentBatchInfoComponent = __decorate([
        core_1.Component({
            selector: 'current-batch-info',
            template: __webpack_require__("./src/app/current-batch-info/current-batch-info.component.html"),
            styles: [__webpack_require__("./src/app/current-batch-info/current-batch-info.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, operations_service_1.OperationsService])
    ], CurrentBatchInfoComponent);
    return CurrentBatchInfoComponent;
}());
exports.CurrentBatchInfoComponent = CurrentBatchInfoComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var FinishBatchComponent = /** @class */ (function () {
    function FinishBatchComponent() {
        this.title = "Finish batch";
        this.groninger1 = "Final HMI Data Groninger 1";
        this.groninger2 = "Final HMI Data Groninger 2";
    }
    FinishBatchComponent.prototype.ngOnInit = function () {
    };
    FinishBatchComponent = __decorate([
        core_1.Component({
            selector: 'app-finish-batch',
            template: __webpack_require__("./src/app/finish-batch/finish-batch.component.html"),
            styles: [__webpack_require__("./src/app/finish-batch/finish-batch.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FinishBatchComponent);
    return FinishBatchComponent;
}());
exports.FinishBatchComponent = FinishBatchComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var FloorstockComponent = /** @class */ (function () {
    function FloorstockComponent() {
    }
    FloorstockComponent.prototype.ngOnInit = function () {
    };
    FloorstockComponent = __decorate([
        core_1.Component({
            selector: 'app-floorstock',
            template: __webpack_require__("./src/app/floorstock/floorstock.component.html"),
            styles: [__webpack_require__("./src/app/floorstock/floorstock.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FloorstockComponent);
    return FloorstockComponent;
}());
exports.FloorstockComponent = FloorstockComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(route) {
        this.route = route;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "./src/app/operations.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var OperationsService = /** @class */ (function () {
    function OperationsService() {
        //TODO: prodActive is now false by default (on page refresh etc.). Should get its value from the DB instead. Same with prodInfo
        this.prodActive = new BehaviorSubject_1.BehaviorSubject(false);
        this.prodActiveObservable = this.prodActive.asObservable();
        this.prodInfo = new BehaviorSubject_1.BehaviorSubject(null);
        this.prodInfoObservable = this.prodInfo.asObservable();
    }
    OperationsService.prototype.changeProdStatus = function (active) {
        this.prodActive.next(active);
    };
    OperationsService.prototype.changeProdInfo = function (info) {
        this.prodInfo.next(info);
    };
    OperationsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], OperationsService);
    return OperationsService;
}());
exports.OperationsService = OperationsService;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ScoreboardComponent = /** @class */ (function () {
    function ScoreboardComponent() {
    }
    ScoreboardComponent.prototype.ngOnInit = function () {
    };
    ScoreboardComponent = __decorate([
        core_1.Component({
            selector: 'app-scoreboard',
            template: __webpack_require__("./src/app/scoreboard/scoreboard.component.html"),
            styles: [__webpack_require__("./src/app/scoreboard/scoreboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ScoreboardComponent);
    return ScoreboardComponent;
}());
exports.ScoreboardComponent = ScoreboardComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ShiftChangeComponent = /** @class */ (function () {
    function ShiftChangeComponent() {
    }
    ShiftChangeComponent.prototype.ngOnInit = function () {
    };
    ShiftChangeComponent = __decorate([
        core_1.Component({
            selector: 'app-shift-change',
            template: __webpack_require__("./src/app/shift-change/shift-change.component.html"),
            styles: [__webpack_require__("./src/app/shift-change/shift-change.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ShiftChangeComponent);
    return ShiftChangeComponent;
}());
exports.ShiftChangeComponent = ShiftChangeComponent;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var operations_service_1 = __webpack_require__("./src/app/operations.service.ts");
var StartBatchComponent = /** @class */ (function () {
    function StartBatchComponent(router, data) {
        this.router = router;
        this.data = data;
        this.title = "Start new batch";
    }
    StartBatchComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Use operationsService to share information between start-batch, finish-batch and current-batch-info
        this.data.prodActiveObservable.subscribe(function (active) { return _this.prodActive = active; });
        this.data.prodInfoObservable.subscribe(function (info) { return _this.prodInfo = info; });
        console.log(this.passedQuery);
        if (this.passedQuery) {
            this.newBatch = this.passedQuery;
        }
    };
    StartBatchComponent.prototype.ngOnDestroy = function () {
        // this.currentBatchObservable.usubscribe() // I want to do this but cant
    };
    StartBatchComponent.prototype.submitBatch = function (event, formData) {
        this.batch = formData.value['batchnr'];
        this.order = formData.value['ordernr'];
        if (this.batch && this.order) {
            this.prodInfo = { batch: this.batch, order: this.order };
            this.data.changeProdStatus(true);
            this.data.changeProdInfo(this.prodInfo);
            console.log("Production status: " + this.prodActive);
            this.router.navigate(['./home']);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StartBatchComponent.prototype, "passedQuery", void 0);
    StartBatchComponent = __decorate([
        core_1.Component({
            selector: 'start-batch',
            template: __webpack_require__("./src/app/start-batch/start-batch.component.html"),
            styles: [__webpack_require__("./src/app/start-batch/start-batch.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router, operations_service_1.OperationsService])
    ], StartBatchComponent);
    return StartBatchComponent;
}());
exports.StartBatchComponent = StartBatchComponent;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map