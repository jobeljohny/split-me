import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInputFieldComponent } from './food-input-field.component';

describe('FoodInputFieldComponent', () => {
  let component: FoodInputFieldComponent;
  let fixture: ComponentFixture<FoodInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodInputFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
