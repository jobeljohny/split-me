import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrParseReviewComponent } from './ocr-parse-review.component';

describe('OcrParseReviewComponent', () => {
  let component: OcrParseReviewComponent;
  let fixture: ComponentFixture<OcrParseReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrParseReviewComponent]
    });
    fixture = TestBed.createComponent(OcrParseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
