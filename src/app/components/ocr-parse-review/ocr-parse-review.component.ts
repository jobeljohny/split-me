import { Component, Input } from '@angular/core';
import { IBillEntry } from 'src/app/classes/interfaces';

@Component({
  selector: 'app-ocr-parse-review',
  templateUrl: './ocr-parse-review.component.html',
  styleUrls: ['./ocr-parse-review.component.scss'],
})
export class OcrParseReviewComponent {
  @Input('index') index: number = -1;
  @Input('item') item: IBillEntry = { item: '', amount: 0 };
  icon: string = '🍽️';
}
