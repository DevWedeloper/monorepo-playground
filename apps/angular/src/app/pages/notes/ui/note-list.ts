import type { Note } from '../types/notes'
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { NoteItem } from './note-item'

@Component({
  selector: 'playground-note-list',
  imports: [NoteItem],
  template: `
    @if (notes().length === 0) {
      <p className="mt-4 text-center">No tasks yet. Add one!</p>
    } @else {
      <ul class="mt-4">
        @for (note of notes(); track note.id) {
          <li>
            <playground-note-item
              [note]="note"
              (toggleChange)="toggleChange.emit($event)"
              (deleteChange)="deleteChange.emit($event)"
              (editChange)="editChange.emit({ id: $event.id, title: $event.title })"
            />
          </li>
        }
      </ul>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteList {
  notes = input.required<Note[]>()

  toggleChange = output<{ id: number, completed: boolean }>()
  deleteChange = output<number>()
  editChange = output<{ id: number, title: string }>()
}
