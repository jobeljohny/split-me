import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputClickSelect]',
})
export class InputClickSelectDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    console.log('click');
    this.el.nativeElement.select();
  }
}
