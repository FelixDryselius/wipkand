import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorstockComponent } from './floorstock.component';

describe('FloorstockComponent', () => {
  let component: FloorstockComponent;
  let fixture: ComponentFixture<FloorstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
