import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective implements OnInit {

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>) {
  }

  @Input('appForEm') numbers: number[]
  ngOnInit(): void {
    for(let number of this.numbers) {
      this.container.createEmbeddedView(this.template, {
        $implicit: number
      })
    }
  }
}
