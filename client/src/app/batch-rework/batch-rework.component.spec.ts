import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchReworkComponent } from './batch-rework.component';

describe('BatchReworkComponent', () => {
  let component: BatchReworkComponent;
  let fixture: ComponentFixture<BatchReworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchReworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchReworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
