import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillTheResultComponent } from './fill-the-result.component';

describe('FillTheResultComponent', () => {
  let component: FillTheResultComponent;
  let fixture: ComponentFixture<FillTheResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillTheResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillTheResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
