import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHistoryDetailComponent } from './batch-history-detail.component';

describe('BatchHistoryDetailComponent', () => {
  let component: BatchHistoryDetailComponent;
  let fixture: ComponentFixture<BatchHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
