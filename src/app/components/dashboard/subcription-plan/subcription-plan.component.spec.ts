import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriptionPlanComponent } from './subcription-plan.component';

describe('SubcriptionPlanComponent', () => {
  let component: SubcriptionPlanComponent;
  let fixture: ComponentFixture<SubcriptionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcriptionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
