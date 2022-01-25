import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailPaidComponent } from './course-detail-paid.component';

describe('CourseDetailPaidComponent', () => {
  let component: CourseDetailPaidComponent;
  let fixture: ComponentFixture<CourseDetailPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
