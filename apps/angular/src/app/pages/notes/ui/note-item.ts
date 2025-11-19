import type { Note } from '../types/notes'
import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, input, linkedSignal, output, signal } from '@angular/core'
import { AutoFocus } from './auto-focus'

@Component({
  selector: 'playground-note-item',
  imports: [NgClass, AutoFocus],
  template: `
    <li class="flex items-center justify-between border-b py-2">
      <div class="flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          [checked]="note().completed"
          (change)="toggleChange.emit({ id: note().id, completed: !note().completed })"
        />

        @if (isEditing()) {
          <input
            #editInput
            type="text"
            [value]="draft()"
            (input)="draft.set(editInput.value)"
            (blur)="handleEdit()"
            (keydown)="handleKeyDown($event)"
            class="flex-1 border-b focus:outline-none"
            playgroundAutoFocus
          />
        } @else {
          <span
            class="flex-1 cursor-text"
            [ngClass]="{ 'line-through': note().completed }"
            (click)="isEditing.set(true)"
            tabindex="0"
            (keydown.enter)="isEditing.set(true)"
          >
            {{ draft() }}
          </span>
        }
      </div>

      <button
        type="button"
        (click)="deleteChange.emit(note().id)"
        class="text-destructive ml-2"
      >
        ✕
      </button>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteItem {
  note = input.required<Note>()

  toggleChange = output<{ id: number, completed: boolean }>()
  deleteChange = output<number>()
  editChange = output<{ id: number, title: string }>()

  protected isEditing = signal(false)
  protected draft = linkedSignal(() => this.note().title)

  protected handleEdit(): void {
    const trimmed = this.draft().trim()
    if (trimmed !== this.note().title) {
      this.editChange.emit({ id: this.note().id, title: trimmed })
    }
    this.isEditing.set(false)
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleEdit()
    }
    else if (event.key === 'Escape') {
      this.draft.set(this.note().title)
      this.isEditing.set(false)
    }
  }
}
