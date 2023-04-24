import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDarkColor]',
})
export class DarkColorDirective {
  constructor(private el: ElementRef) {
    // let bgColor = this.getColor();
    // this.el.nativeElement.style.backgroundColor = '#3a3b3f';
    // this.el.nativeElement.style.color = this.binarifyBW(bgColor);
  }
  getColor() {
    let magnitude = -100;
    let hexColor = Math.floor(Math.random() * 16777215).toString(16);
    if (hexColor.length != 6) hexColor = hexColor.padEnd(6, '0');
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    let darkened = `#${(g | (b << 8) | (r << 16))
      .toString(16)
      .padStart(6, '0')}`;

    console.log(darkened);

    return darkened;
  }

  binarifyBW(hex: string) {
    hex = hex.slice(1);
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
}
