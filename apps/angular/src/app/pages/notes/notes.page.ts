import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CreateNote } from './data-access/create-note'
import { DeleteNote } from './data-access/delete-note'
import { GetNotes } from './data-access/get-notes'
import { UpdateNote } from './data-access/update-note'
import { NoteInput } from './ui/note-input'
import { NoteList } from './ui/note-list'

@Component({
  selector: 'playground-notes',
  imports: [JsonPipe, NoteList, NoteInput],
  host: {
    class: 'flex flex-col items-center p-6',
  },
  template: `
    <div class="relative max-w-md rounded-2xl p-6 shadow-lg">
      <h1 class="mb-4 text-center text-2xl font-bold">📝 Angular Notes</h1>

      <div class="mb-4 flex flex-col items-center">
        <h3>Data States</h3>
        <pre class="whitespace-pre-wrap">{{ {
          deleteNote: dataDeleteNote() || null,
          updateNote: dataUpdateNote() || null,
          createNote: dataCreateNote() || null,
        } | json }}</pre>

        <h3>Loading States</h3>
        <pre>{{ {
          getNotes: isLoadingGetNotes(),
          deleteNote: isLoadingDeleteNote(),
          updateNote: isLoadingUpdateNote(),
          createNote: isLoadingCreateNote()
        } | json }}</pre>

        <h3>Error States</h3>
        <pre class="whitespace-pre-wrap">{{ {
          getNotes: errorGetNotes() || null,
          deleteNote: errorDeleteNote() || null,
          updateNote: errorUpdateNote() || null,
          createNote: errorCreateNote() || null,
        } | json }}</pre>
      </div>

      <playground-note-input
        (addChange)="onAdd($event)"
      />
      <playground-note-list
        [notes]="notes()"
        (toggleChange)="onToggle($event)"
        (deleteChange)="onDelete($event)"
        (editChange)="onEdit($event)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesPage {
  private getNotes = inject(GetNotes)
  private createNote = inject(CreateNote)
  private updateNote = inject(UpdateNote)
  private deleteNote = inject(DeleteNote)

  protected notes = this.getNotes.notes

  protected dataDeleteNote = this.deleteNote.data
  protected dataUpdateNote = this.updateNote.data
  protected dataCreateNote = this.createNote.data

  protected isLoadingGetNotes = this.getNotes.isLoading
  protected isLoadingDeleteNote = this.deleteNote.isLoading
  protected isLoadingUpdateNote = this.updateNote.isLoading
  protected isLoadingCreateNote = this.createNote.isLoading

  protected errorGetNotes = this.getNotes.error
  protected errorDeleteNote = this.deleteNote.error
  protected errorUpdateNote = this.updateNote.error
  protected errorCreateNote = this.createNote.error

  protected onAdd(title: string): void {
    this.createNote.createNote(title)
  }

  protected onToggle(data: { id: number, completed: boolean }): void {
    this.updateNote.updateNote(data.id, { completed: data.completed })
  }

  protected onDelete(id: number): void {
    this.deleteNote.deleteNote(id)
  }

  protected onEdit(data: { id: number, title: string }): void {
    this.updateNote.updateNote(data.id, { title: data.title })
  }
}
