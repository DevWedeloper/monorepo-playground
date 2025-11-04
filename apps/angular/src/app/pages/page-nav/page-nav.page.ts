import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MainSection } from './page-nav/main-section'
import { PageNav } from './page-nav/page-nav'

@Component({
  selector: 'playground-page-nav-page',
  imports: [PageNav, MainSection],
  template: `
    <section playgroundMainSection>
      <h2 id="example-heading">Example Heading</h2>

      <h3 id="example-subheading">Example Subheading</h3>
    </section>
    <playground-page-nav />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavPage { }
