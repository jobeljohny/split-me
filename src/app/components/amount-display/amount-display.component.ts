import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
})
export class AmountDisplayComponent implements OnChanges {
  @Input('title') title: string = '';
  @Input('logoSrc') logoSrc: string = '';
  @Input('amount') amount: number = 0;

  rupees: string = '';
  paisa: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const amt: string = formatCurrency(
      changes['amount'].currentValue,
      'en-US',
      '₹',
      'INR',
      '4.2-2'
    );

    [this.rupees,this.paisa] = amt.split('.')
    
  }
}
