import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCourseComponent } from './accept-course.component';

describe('AcceptCourseComponent', () => {
  let component: AcceptCourseComponent;
  let fixture: ComponentFixture<AcceptCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
