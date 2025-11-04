import { NgClass } from '@angular/common'
import { Component, ElementRef, inject } from '@angular/core'
import { PageNavLink } from './page-nav-link'

type SamePageAnchorLink = {
  id: string
  label: string
  isNested: boolean
}

@Component({
  selector: 'playground-page-nav',
  imports: [NgClass, PageNavLink],
  host: {
    class: 'flex flex-col',
  },
  template: `
    @for (link of links; track link.id) {
      <playground-page-nav-link
        [ngClass]="{ 'pl-4': link.isNested }"
        [fragment]="link.id"
        [label]="link.label"
      />
    }
  `,
})
export class PageNav {
  /**
   * Reference to the tag with the main content of the page.
   * For this to work, the component should be added immediately after a tag with the [playgroundMainSection] directive.
   */
  private page: HTMLElement = (inject(ElementRef).nativeElement as HTMLElement)
    .previousSibling as HTMLElement

  protected links: SamePageAnchorLink[] = (() => {
    const selectors = ['[playgroundMainSection] > h2', '[playgroundMainSection] > h3']
    const headings = Array.from(this.page.querySelectorAll(selectors.join(',')) ?? [])
    const links = headings.map((element) => {
      const { id, localName, textContent } = element
      const isSubHeading = localName === 'h2'
      const label = textContent
      return { id, label, isNested: !isSubHeading }
    })

    return links
  })()
}
