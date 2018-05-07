// import { Component, OnInit } from '@angular/core';

// import {NgxChartsModule} from '@swimlane/ngx-charts';
// import { OperationsService } from '../../operation/shared/services/operations.service';
// import { QueryResponse } from '../../shared/interfaces/query-response';
// import { Scoreboard } from '../../../assets/interface/scoreboard';


import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable} from 'rxjs/Rx';


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
  }

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
  ]

  countryCount = [];
  countryData = [];

  //Chart
  view: any[] = [700, 400];
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  explodeSlices = true;
  doughnut = false;

  constructor() {}

 
  ngOnInit() {
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