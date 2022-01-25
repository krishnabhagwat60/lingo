import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickWordSolutionComponent } from './pick-word-solution.component';

describe('PickWordSolutionComponent', () => {
  let component: PickWordSolutionComponent;
  let fixture: ComponentFixture<PickWordSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickWordSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickWordSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
