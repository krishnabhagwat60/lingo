import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDropdownResultComponent } from './question-dropdown-result.component';

describe('QuestionDropdownResultComponent', () => {
  let component: QuestionDropdownResultComponent;
  let fixture: ComponentFixture<QuestionDropdownResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDropdownResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDropdownResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
