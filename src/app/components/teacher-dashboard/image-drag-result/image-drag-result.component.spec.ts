import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDragResultComponent } from './image-drag-result.component';

describe('ImageDragResultComponent', () => {
  let component: ImageDragResultComponent;
  let fixture: ComponentFixture<ImageDragResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDragResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDragResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
