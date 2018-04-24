import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { OperationsService } from '../../operation/shared/services/operations.service';
import { QueryResponse } from '../../shared/interfaces/query-response';
import { Scoreboard } from '../../../assets/interface/scoreboard';

@Component({
  selector: 'app-statistics-charts',
  templateUrl: './statistics-charts.component.html',
  styleUrls: ['./statistics-charts.component.css']
})
export class StatisticsChartsComponent implements OnInit {
  chart =[];
  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
  


   this.operationsService.getProductionStatistics('?limit=72').subscribe(data =>{
     let productionStatistics
    productionStatistics = (data as QueryResponse).results as Scoreboard []
    
    let productionQuantity = productionStatistics.map(res => res.production_quantity)
    let productionTimeStamp = productionStatistics.map(res => new Date(res.time_stamp).toLocaleTimeString('sv-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) )

    console.log('productionQuantity: ' + productionQuantity);
    console.log('productionTimeStamp: ' + productionTimeStamp);
    
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: productionTimeStamp,
        datasets: [
          { 
            data: productionQuantity,
            borderColor: "#3cba9f",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    
    
   }) 
  }
}
