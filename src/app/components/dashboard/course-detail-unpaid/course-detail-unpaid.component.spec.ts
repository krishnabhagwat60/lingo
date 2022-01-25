import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailUnpaidComponent } from './course-detail-unpaid.component';

describe('CourseDetailUnpaidComponent', () => {
  let component: CourseDetailUnpaidComponent;
  let fixture: ComponentFixture<CourseDetailUnpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailUnpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
