import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'playground-root',
  imports: [RouterOutlet],
  host: {
    class: 'block min-h-screen bg-background text-foreground font-sans p-8',
  },
  template: `
    <router-outlet />
  `,
})
export class App {}
