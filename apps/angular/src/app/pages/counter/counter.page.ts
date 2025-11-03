import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

@Component({
  selector: 'playground-counter',
  standalone: true,
  host: {
    class: 'flex items-center justify-center min-h-screen',
  },
  template: `
    <div class="flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-2xl shadow-sm w-64">
      <h2 class="text-2xl font-semibold">Counter</h2>

      <p class="text-4xl font-bold">{{ count() }}</p>

      <div class="flex gap-3">
        <button
          class="px-4 py-2 bg-indigo-500 text-white font-medium rounded-xl"
          (click)="increment()"
        >
          +
        </button>

        <button
          class="px-4 py-2 bg-gray-400 text-white font-medium rounded-xl"
          (click)="decrement()"
        >
          -
        </button>

        <button
          class="px-4 py-2 bg-red-500 text-white font-medium rounded-xl"
          (click)="reset()"
        >
          Reset
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPage {
  protected count = signal(0)

  protected increment() {
    this.count.update(c => c + 1)
  }

  protected decrement() {
    this.count.update(c => c - 1)
  }

  protected reset() {
    this.count.set(0)
  }
}
