import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBillEntry } from 'src/app/classes/interfaces';
import { getLogo } from 'src/app/constants/food-names';

@Component({
  selector: 'app-ocr-parse-review',
  templateUrl: './ocr-parse-review.component.html',
  styleUrls: ['./ocr-parse-review.component.scss'],
})
export class OcrParseReviewComponent implements OnInit {
  @Input('index') index: number = -1;
  @Input('item') item: IBillEntry = { item: '', amount: 0 };
  @Output('remove') remove = new EventEmitter();
  icon: string = '🍽️';

  ngOnInit(): void {
    this.icon = getLogo(this.item.item)
  }
}
