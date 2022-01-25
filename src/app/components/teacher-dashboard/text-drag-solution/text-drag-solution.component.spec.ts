import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDragSolutionComponent } from './text-drag-solution.component';

describe('TextDragSolutionComponent', () => {
  let component: TextDragSolutionComponent;
  let fixture: ComponentFixture<TextDragSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDragSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDragSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
