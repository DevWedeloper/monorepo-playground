import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'

@Component({
  selector: 'playground-page-nav-link',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="[]"
      [relativeTo]="_activatedRoute"
      [fragment]="fragment()"
    >
      {{ label() }}
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavLink {
  protected _activatedRoute = inject(ActivatedRoute)
  fragment = input.required<string>()
  label = input.required<string>()
}
