import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakUpInfoComponent } from './break-up-info.component';

describe('BreakUpInfoComponent', () => {
  let component: BreakUpInfoComponent;
  let fixture: ComponentFixture<BreakUpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakUpInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakUpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
