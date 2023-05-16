import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCtrlClick]',
})
export class CtrlClickDirective {
  private unsubscribe: any;

  @Output('ctrl-click') ctrlClickEvent = new EventEmitter();
  constructor(private renderer: Renderer2, private element: ElementRef) {}
  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      this.element.nativeElement,
      'click',
      (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();
          this.ctrlClickEvent.emit(event);
        }
      }
    );
  }

  ngOnDestroy() {
    if (!this.unsubscribe) {
      return;
    }
    this.unsubscribe();
  }
}
