import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesRadioSolutionComponent } from './ques-radio-solution.component';

describe('QuesRadioSolutionComponent', () => {
  let component: QuesRadioSolutionComponent;
  let fixture: ComponentFixture<QuesRadioSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesRadioSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesRadioSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
