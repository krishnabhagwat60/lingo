import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAndPricingComponent } from './plans-and-pricing.component';

describe('PlansAndPricingComponent', () => {
  let component: PlansAndPricingComponent;
  let fixture: ComponentFixture<PlansAndPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansAndPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansAndPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
