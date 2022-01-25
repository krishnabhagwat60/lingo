import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRadioResultComponent } from './question-radio-result.component';

describe('QuestionRadioResultComponent', () => {
  let component: QuestionRadioResultComponent;
  let fixture: ComponentFixture<QuestionRadioResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRadioResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRadioResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
