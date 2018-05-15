import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHistoryComponent } from './batch-history.component';

describe('BatchHistoryComponent', () => {
  let component: BatchHistoryComponent;
  let fixture: ComponentFixture<BatchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
