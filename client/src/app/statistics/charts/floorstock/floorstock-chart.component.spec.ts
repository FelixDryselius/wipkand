import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorstockChartComponent } from './floorstock-chart.component';

describe('FloorstockChartComponent', () => {
  let component: FloorstockChartComponent;
  let fixture: ComponentFixture<FloorstockChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorstockChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorstockChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
