import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[PositiveNumber]'
})
export class PositiveNumber {
  constructor() { }

  @Input() PositiveNumber: boolean;
  @HostListener('keydown', ['$event']) onkeydown(event) {
    let e = <KeyboardEvent> event;
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 46 || e.keyCode === 8) || e.shiftKey || e.altKey) {
      e.preventDefault();
    }
  }
}
