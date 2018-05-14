import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPerTimeUnitComponent } from './production-per-time-unit.component';

describe('ProductionPerTimeUnitComponent', () => {
  let component: ProductionPerTimeUnitComponent;
  let fixture: ComponentFixture<ProductionPerTimeUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionPerTimeUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionPerTimeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
