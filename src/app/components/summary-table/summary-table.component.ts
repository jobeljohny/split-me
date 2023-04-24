import { Component, Input } from '@angular/core';
import { IndividualSummary } from 'src/app/classes/individual-summary';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent {
  @Input('summaryData')
  person: IndividualSummary;

  constructor() {
    this.person = new IndividualSummary('', [], 0, 0);
  }

  getRD() {
    let hex = '#000000';
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let lum = 1;

    // convert to decimal and change luminosity
    var rgb = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  }
}
