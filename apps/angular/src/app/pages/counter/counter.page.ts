import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

@Component({
  selector: 'playground-counter',
  host: {
    class: 'flex items-center justify-center min-h-screen',
  },
  template: `
    <div class="bg-background flex w-64 flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-sm">
      <h2 class="text-2xl font-semibold">Counter</h2>

      <p class="text-4xl font-bold">{{ count() }}</p>

      <div class="flex gap-3">
        <button
          class="rounded-xl bg-indigo-500 px-4 py-2 font-medium text-white"
          (click)="increment()"
        >
          +
        </button>

        <button
          class="rounded-xl bg-gray-400 px-4 py-2 font-medium text-white"
          (click)="decrement()"
        >
          -
        </button>

        <button
          class="rounded-xl bg-red-500 px-4 py-2 font-medium text-white"
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
