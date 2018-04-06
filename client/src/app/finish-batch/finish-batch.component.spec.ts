import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishBatchComponent } from './finish-batch.component';

describe('FinishBatchComponent', () => {
  let component: FinishBatchComponent;
  let fixture: ComponentFixture<FinishBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
