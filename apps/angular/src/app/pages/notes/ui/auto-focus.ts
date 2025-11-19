import type { OnInit } from '@angular/core'
import { Directive, ElementRef, inject } from '@angular/core'

@Directive({
  selector: '[playgroundAutoFocus]',
})
export class AutoFocus implements OnInit {
  private elementRef = inject(ElementRef)

  ngOnInit(): void {
    this.elementRef.nativeElement.focus()
  }
}
