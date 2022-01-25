import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationResultComponent } from './affiliation-result.component';

describe('AffiliationResultComponent', () => {
  let component: AffiliationResultComponent;
  let fixture: ComponentFixture<AffiliationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
