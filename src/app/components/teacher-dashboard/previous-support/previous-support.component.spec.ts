import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSupportComponent } from './previous-support.component';

describe('PreviousSupportComponent', () => {
  let component: PreviousSupportComponent;
  let fixture: ComponentFixture<PreviousSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
