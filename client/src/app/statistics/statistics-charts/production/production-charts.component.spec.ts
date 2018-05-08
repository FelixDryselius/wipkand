import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsChartsComponent } from './production-charts.component';

describe('StatisticsChartsComponent', () => {
  let component: StatisticsChartsComponent;
  let fixture: ComponentFixture<StatisticsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
