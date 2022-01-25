import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionAffiliationComponent } from './solution-affiliation.component';

describe('SolutionAffiliationComponent', () => {
  let component: SolutionAffiliationComponent;
  let fixture: ComponentFixture<SolutionAffiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionAffiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
