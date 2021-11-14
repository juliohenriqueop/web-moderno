import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIcon]'
})
export class IconDirective {

  constructor(private el:ElementRef) {
    el.nativeElement.style.userSelect = 'none';
  }

}
