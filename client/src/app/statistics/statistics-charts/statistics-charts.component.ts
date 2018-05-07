import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable} from 'rxjs/Rx';

import { AuthAPIService } from '../../auth/auth.service';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Scoreboard } from '../../../assets/interface/scoreboard';




@Component({
  selector: 'app-statistics-charts',
  templateUrl: './statistics-charts.component.html',
  styleUrls: ['./statistics-charts.component.css']
})
export class StatisticsChartsComponent implements OnInit {
  
  survey = {
    country: '',
    gender: '',
    rating: 0
  };

  //data
  chartdata = [
    {
      "name": "Germany",
      "value": 40632
    },
    {
      "name": "United States",
      "value": 49737
    },
    {
      "name": "France",
      "value": 36745
    },
    {
      "name": "United Kingdom",
      "value": 36240
    },
    {
      "name": "Spain",
      "value": 33000
    },
    {
      "name": "Italy",
      "value": 35800
    }
  ];

  chartdataLine = [
    {
      "name": "Germany",
      "series": [
        {
          "value": 4465,
          "name": "2016-09-18T11:01:51.638Z"
        },
        {
          "value": 2790,
          "name": "2016-09-13T07:23:25.764Z"
        },
        {
          "value": 6450,
          "name": "2016-09-13T14:17:09.128Z"
        },
        {
          "value": 4214,
          "name": "2016-09-23T23:30:35.974Z"
        },
        {
          "value": 4006,
          "name": "2016-09-13T02:27:34.421Z"
        },
        {
          "name": "2016-09-12T21:37:39.105Z",
          "value": 2700
        },
        {
          "name": "2016-09-12T21:11:17.110Z",
          "value": 5780
        },
        {
          "name": "2016-09-15T11:25:50.248Z",
          "value": 6538
        },
        {
          "name": "2016-09-14T17:39:46.429Z",
          "value": 5695
        },
        {
          "name": "2016-09-20T12:09:48.571Z",
          "value": 6115
        },
        {
          "name": "2016-09-14T11:54:01.596Z",
          "value": 3695
        }
      ]
    },
  ​
    {
      "name": "USA",
      "series": [
        {
          "value": 6339,
          "name": "2016-09-18T11:01:51.638Z"
        },
        {
          "value": 5413,
          "name": "2016-09-13T07:23:25.764Z"
        },
        {
          "value": 5417,
          "name": "2016-09-13T14:17:09.128Z"
        },
        {
          "value": 4028,
          "name": "2016-09-23T23:30:35.974Z"
        },
        {
          "value": 4521,
          "name": "2016-09-13T02:27:34.421Z"
        },
        {
          "name": "2016-09-12T21:37:39.105Z",
          "value": 4287
        },
        {
          "name": "2016-09-12T21:11:17.110Z",
          "value": 6092
        },
        {
          "name": "2016-09-15T11:25:50.248Z",
          "value": 3112
        },
        {
          "name": "2016-09-14T17:39:46.429Z",
          "value": 6079
        },
        {
          "name": "2016-09-20T12:09:48.571Z",
          "value": 2168
        },
        {
          "name": "2016-09-14T11:54:01.596Z",
          "value": 5629
        }
      ]
    }
  ];

  //Chart
  view: any[] = [700, 400];
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = true;
  doughnut = false;

  constructor(private authAPI:AuthAPIService, private operationsService:OperationsService) { }
    


 
  ngOnInit() {

    this.operationsService.getProductionStatistics('?limit=72')
    .retryWhen(error => this.authAPI.checkHttpRetry(error))
    .subscribe(data =>{
      let productionStatistics
     productionStatistics = (data as QueryResponse).results as Scoreboard []
     
     let productionQuantity = productionStatistics.map(res => res.production_quantity)
     let productionTimeStamp = productionStatistics.map(res => new Date(res.time_stamp).toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) )
 
     console.log('productionQuantity: ' + productionQuantity);
     console.log('productionTimeStamp: ' + productionTimeStamp);
    })    
  }

  pressed(event) {
    console.log('event triggered');
    
    console.log(event);
    this.chartdata = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      }
    ] 
  }
}



// import { Component, OnInit } from '@angular/core';

// import { Chart } from 'chart.js';
// import { OperationsService } from '../../operation/shared/services/operations.service';
// import { QueryResponse } from '../../shared/interfaces/query-response';
// import { Scoreboard } from '../../../assets/interface/scoreboard';

// @Component({
//   selector: 'app-statistics-charts',
//   templateUrl: './statistics-charts.component.html',
//   styleUrls: ['./statistics-charts.component.css']
// })
// export class StatisticsChartsComponent implements OnInit {
//   chart =[];
//   constructor(private operationsService: OperationsService) { }

//   ngOnInit() {
  



    
//     this.chart = new Chart('canvas', {
//       type: 'line',
//       data: {
//         labels: productionTimeStamp,
//         datasets: [
//           { 
//             data: productionQuantity,
//             borderColor: "#3cba9f",
//             fill: false
//           },
//         ]
//       },
//       options: {
//         legend: {
//           display: false
//         },
//         scales: {
//           xAxes: [{
//             display: true
//           }],
//           yAxes: [{
//             display: true
//           }],
//         }
//       }
//     });
    
    
//    }) 
//   }
// }
