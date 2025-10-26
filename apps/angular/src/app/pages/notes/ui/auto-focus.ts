import { Directive, ElementRef, inject } from '@angular/core'

@Directive({
  selector: '[playgroundAutoFocus]',
})
export class AutoFocus {
  private elementRef = inject(ElementRef)

  ngOnInit(): void {
    this.elementRef.nativeElement.focus()
  }
}
