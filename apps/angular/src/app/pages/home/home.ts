import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'playground-home',
  imports: [RouterLink],
  host: {
    class: 'block',
  },
  template: `
    <section class="max-w-3xl mx-auto text-center space-y-8">
      <header>
        <h1 class="text-4xl font-bold text-primary mb-2">
          Welcome to Angular Playground!
        </h1>
        <p class="text-muted-foreground text-lg">
          Checkout the following examples to see how different things are done in Angular.
        </p>
      </header>

      <hr class="border-t border-border my-6" />

      <ul class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        @for (route of routes; track route) {
          <li>
            <a
              [routerLink]="route"
              class="block p-4 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground shadow-sm transition-all duration-200"
            >
              /{{ route }}
            </a>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Home {
  protected routes = inject(Router)
    .config
    .map(route => route.path)
    .filter((path): path is string => !!path)
    .sort((a, b) => a.localeCompare(b))
}
