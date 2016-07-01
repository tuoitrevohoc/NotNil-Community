import { Directive, ElementRef, Input } from '@angular/core'

declare var MathJax: any


@Directive({
  selector: "[math-expression]"
})
export class ExpressionDirective {
  @Input("math-expression") expression: String

  constructor (private element: ElementRef) {}

  ngOnChanges() {
    this.element.nativeElement.innerHTML = "$" + this.expression + "$"
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement])
  }
}