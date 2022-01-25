import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCourseDashboardComponent } from './creat-course-dashboard.component';

describe('CreatCourseDashboardComponent', () => {
  let component: CreatCourseDashboardComponent;
  let fixture: ComponentFixture<CreatCourseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatCourseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
