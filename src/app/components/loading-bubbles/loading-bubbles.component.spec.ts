import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBubblesComponent } from './loading-bubbles.component';

describe('LoadingBubblesComponent', () => {
  let component: LoadingBubblesComponent;
  let fixture: ComponentFixture<LoadingBubblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBubblesComponent]
    });
    fixture = TestBed.createComponent(LoadingBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
