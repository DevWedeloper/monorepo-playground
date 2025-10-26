import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'playground-note-input',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="handleSubmit()" class="flex gap-2">
      <input
        type="text"
        [(ngModel)]="value"
        name="note-input"
        placeholder="Add a new task..."
        class="flex-1 rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        class="rounded-lg px-4 py-2 bg-accent"
      >
        Add
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteInput {
  value = signal('')

  onAdd = output<string>()

  handleSubmit(): void {
    const trimmed = this.value().trim()
    if (!trimmed)
      return
    this.onAdd.emit(trimmed)
    this.value.set('')
  }
}
