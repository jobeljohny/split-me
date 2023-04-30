import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryQrModalComponent } from './summary-qr-modal.component';

describe('SummaryQrModalComponent', () => {
  let component: SummaryQrModalComponent;
  let fixture: ComponentFixture<SummaryQrModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryQrModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryQrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
