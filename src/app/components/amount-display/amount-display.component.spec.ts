import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountDisplayComponent } from './amount-display.component';

describe('AmountDisplayComponent', () => {
  let component: AmountDisplayComponent;
  let fixture: ComponentFixture<AmountDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
