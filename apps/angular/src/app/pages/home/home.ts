import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'playground-home',
  imports: [RouterLink],
  host: {
    class: 'block p-8',
  },
  template: `
    <section class="mx-auto max-w-3xl space-y-8 text-center">
      <header>
        <h1 class="text-primary mb-2 text-4xl font-bold">
          Welcome to Angular Playground!
        </h1>
        <p class="text-muted-foreground text-lg">
          Checkout the following examples to see how different things are done in Angular.
        </p>
      </header>

      <hr class="border-border my-6 border-t" />

      <ul class="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        @for (route of routes; track route) {
          <li>
            <a
              [routerLink]="route"
              class="border-border bg-card block rounded-lg border p-4 shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
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
