import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillImagePreviewComponent } from './bill-image-preview.component';

describe('BillImagePreviewComponent', () => {
  let component: BillImagePreviewComponent;
  let fixture: ComponentFixture<BillImagePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillImagePreviewComponent]
    });
    fixture = TestBed.createComponent(BillImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
