import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRightResultComponent } from './pick-right-result.component';

describe('PickRightResultComponent', () => {
  let component: PickRightResultComponent;
  let fixture: ComponentFixture<PickRightResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickRightResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickRightResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
