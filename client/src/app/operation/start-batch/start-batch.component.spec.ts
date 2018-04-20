import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBatchComponent } from './start-batch.component';

describe('StartBatchComponent', () => {
  let component: StartBatchComponent;
  let fixture: ComponentFixture<StartBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
