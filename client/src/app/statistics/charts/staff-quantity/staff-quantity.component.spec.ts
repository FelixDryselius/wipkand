import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffQuantityComponent } from './staff-quantity.component';

describe('StaffQuantityComponent', () => {
  let component: StaffQuantityComponent;
  let fixture: ComponentFixture<StaffQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
