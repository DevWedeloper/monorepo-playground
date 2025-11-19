import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'playground-root',
  imports: [RouterOutlet],
  template: `
    <main class="bg-background text-foreground block min-h-screen font-sans">
      <router-outlet />
    </main>
  `,
})
export class App {}
