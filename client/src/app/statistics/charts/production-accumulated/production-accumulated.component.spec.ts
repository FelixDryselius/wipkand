import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAccumulatedComponent } from './production-accumulated.component';

describe('ProductionAccumulatedComponent', () => {
  let component: ProductionAccumulatedComponent;
  let fixture: ComponentFixture<ProductionAccumulatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionAccumulatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionAccumulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
