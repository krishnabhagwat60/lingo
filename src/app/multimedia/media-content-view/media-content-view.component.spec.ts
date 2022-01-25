import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaContentViewComponent } from './media-content-view.component';

describe('MediaContentViewComponent', () => {
  let component: MediaContentViewComponent;
  let fixture: ComponentFixture<MediaContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
