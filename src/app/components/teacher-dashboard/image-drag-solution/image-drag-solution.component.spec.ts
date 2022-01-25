import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDragSolutionComponent } from './image-drag-solution.component';

describe('ImageDragSolutionComponent', () => {
  let component: ImageDragSolutionComponent;
  let fixture: ComponentFixture<ImageDragSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDragSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDragSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
