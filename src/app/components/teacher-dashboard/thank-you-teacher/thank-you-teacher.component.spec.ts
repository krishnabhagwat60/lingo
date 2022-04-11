import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouTeacherComponent } from './thank-you-teacher.component';

describe('ThankYouTeacherComponent', () => {
  let component: ThankYouTeacherComponent;
  let fixture: ComponentFixture<ThankYouTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
