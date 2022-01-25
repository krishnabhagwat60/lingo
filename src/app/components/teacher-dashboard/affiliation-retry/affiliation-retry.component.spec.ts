import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliationRetryComponent } from './affiliation-retry.component';

describe('AffiliationRetryComponent', () => {
  let component: AffiliationRetryComponent;
  let fixture: ComponentFixture<AffiliationRetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliationRetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliationRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
