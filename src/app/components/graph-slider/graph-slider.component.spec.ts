import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSliderComponent } from './graph-slider.component';

describe('GraphSliderComponent', () => {
  let component: GraphSliderComponent;
  let fixture: ComponentFixture<GraphSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphSliderComponent]
    });
    fixture = TestBed.createComponent(GraphSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
