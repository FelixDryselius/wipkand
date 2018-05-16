import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBatchInfoComponent } from './current-batch-info.component';

describe('CurrentBatchInfoComponent', () => {
  let component: CurrentBatchInfoComponent;
  let fixture: ComponentFixture<CurrentBatchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBatchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBatchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
