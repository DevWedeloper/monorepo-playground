import type { Note } from '../types/notes'
import React from 'react'
import { NoteItem } from './NoteItem'

interface Props {
  notes: Note[]
  onToggle: (payload: { id: number, completed: boolean }) => void
  onDelete: (id: number) => void
  onEdit: (payload: { id: number, title: string }) => void
}

export const NoteList: React.FC<Props> = ({
  notes,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (notes.length === 0) {
    return <p className="mt-4 text-center">No tasks yet. Add one!</p>
  }

  return (
    <ul className="mt-4">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
