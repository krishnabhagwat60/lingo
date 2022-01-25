import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillWordSolutionComponent } from './fill-word-solution.component';

describe('FillWordSolutionComponent', () => {
  let component: FillWordSolutionComponent;
  let fixture: ComponentFixture<FillWordSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillWordSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillWordSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
