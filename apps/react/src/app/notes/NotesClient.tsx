'use client'

import { useCreateNote } from './data-access/useCreateNote'
import { useDeleteNote } from './data-access/useDeleteNote'
import { useGetNotes } from './data-access/useGetNotes'
import { useUpdateNote } from './data-access/useUpdateNote'
import { NoteInput } from './ui/NoteInput'
import { NoteList } from './ui/NoteList'

export default function NotesPage() {
  const {
    notes,
    isLoading: isLoadingGetNotes,
    error: errorGetNotes,
  } = useGetNotes()

  const {
    createNote,
    data: dataCreateNote,
    isLoading: isLoadingCreateNote,
    error: errorCreateNote,
  } = useCreateNote()

  const {
    updateNote,
    data: dataUpdateNote,
    isLoading: isLoadingUpdateNote,
    error: errorUpdateNote,
  } = useUpdateNote()

  const {
    deleteNote,
    data: dataDeleteNote,
    isLoading: isLoadingDeleteNote,
    error: errorDeleteNote,
  } = useDeleteNote()

  const handleAdd = (title: string) => {
    createNote(title)
  }

  const handleToggle = (data: { id: number, completed: boolean }) => {
    updateNote(data.id, { completed: data.completed })
  }

  const handleDelete = (id: number) => {
    deleteNote(id)
  }

  const handleEdit = (data: { id: number, title: string }) => {
    updateNote(data.id, { title: data.title })
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="relative max-w-md rounded-2xl p-6 shadow-lg w-full">
        <h1 className="mb-4 text-center text-2xl font-bold">📝 React Notes</h1>

        <div className="flex flex-col items-center mb-4 text-sm">
          <h3 className="font-semibold">Data States</h3>
          <pre className="whitespace-pre-wrap" data-testid="success-states">
            {JSON.stringify(
              {
                deleteNote: dataDeleteNote || null,
                updateNote: dataUpdateNote || null,
                createNote: dataCreateNote || null,
              },
              null,
              2,
            )}
          </pre>

          <h3 className="font-semibold mt-2">Loading States</h3>
          <pre data-testid="loading-states">
            {JSON.stringify(
              {
                getNotes: isLoadingGetNotes,
                deleteNote: isLoadingDeleteNote,
                updateNote: isLoadingUpdateNote,
                createNote: isLoadingCreateNote,
              },
              null,
              2,
            )}
          </pre>

          <h3 className="font-semibold mt-2">Error States</h3>
          <pre className="whitespace-pre-wrap" data-testid="error-states">
            {JSON.stringify(
              {
                getNotes: errorGetNotes,
                deleteNote: errorDeleteNote,
                updateNote: errorUpdateNote,
                createNote: errorCreateNote,
              },
              null,
              2,
            )}
          </pre>
        </div>

        <NoteInput onAdd={handleAdd} />

        <NoteList
          notes={notes}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
