import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSupportComponent } from './teacher-support.component';

describe('TeacherSupportComponent', () => {
  let component: TeacherSupportComponent;
  let fixture: ComponentFixture<TeacherSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
