import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'playground-root',
  imports: [RouterOutlet],
  template: `
    <main class="block min-h-screen bg-background text-foreground font-sans p-8">
      <router-outlet />
    </main>
  `,
})
export class App {}
