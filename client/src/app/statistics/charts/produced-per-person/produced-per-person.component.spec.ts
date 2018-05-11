import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedPerPersonComponent } from './produced-per-person.component';

describe('ProducedPerPersonComponent', () => {
  let component: ProducedPerPersonComponent;
  let fixture: ComponentFixture<ProducedPerPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducedPerPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducedPerPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
