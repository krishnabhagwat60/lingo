import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCourseIntroComponent } from './add-new-course-intro.component';

describe('AddNewCourseIntroComponent', () => {
  let component: AddNewCourseIntroComponent;
  let fixture: ComponentFixture<AddNewCourseIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCourseIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCourseIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
