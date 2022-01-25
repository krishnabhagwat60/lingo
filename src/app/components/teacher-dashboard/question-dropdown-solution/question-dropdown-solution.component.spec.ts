import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDropdownSolutionComponent } from './question-dropdown-solution.component';

describe('QuestionDropdownSolutionComponent', () => {
  let component: QuestionDropdownSolutionComponent;
  let fixture: ComponentFixture<QuestionDropdownSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDropdownSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDropdownSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
