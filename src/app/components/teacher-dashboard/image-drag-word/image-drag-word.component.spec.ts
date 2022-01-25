import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDragWordComponent } from './image-drag-word.component';

describe('ImageDragWordComponent', () => {
  let component: ImageDragWordComponent;
  let fixture: ComponentFixture<ImageDragWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDragWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDragWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
