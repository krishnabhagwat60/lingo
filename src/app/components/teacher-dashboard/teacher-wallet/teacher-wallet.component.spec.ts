import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWalletComponent } from './teacher-wallet.component';

describe('TeacherWalletComponent', () => {
  let component: TeacherWalletComponent;
  let fixture: ComponentFixture<TeacherWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
