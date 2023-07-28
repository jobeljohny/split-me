import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakUpTableComponent } from './break-up-table.component';

describe('BreakUpTableComponent', () => {
  let component: BreakUpTableComponent;
  let fixture: ComponentFixture<BreakUpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakUpTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakUpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
