import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private routeSub:any;
  private req:any;
  private batchnr: number;
  private ordernr: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.routeSub = this.route.params.subscribe(params=>{
    this.batchnr = params.batchnr
    this.ordernr = params.ordernr
    }) 
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}


