import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { Note } from '../types/notes'

type Props = {
  note: Note
  onToggle: (payload: { id: number, completed: boolean }) => void
  onDelete: (id: number) => void
  onEdit: (payload: { id: number, title: string }) => void
}

export const NoteItem: React.FC<Props> = ({
  note,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(note.title)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  const handleEdit = () => {
    const trimmed = draft.trim()
    if (trimmed !== note.title) {
      onEdit({ id: note.id, title: trimmed })
    }
    setIsEditing(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleEdit()
    }
    else if (event.key === 'Escape') {
      setDraft(note.title)
      setIsEditing(false)
    }
  }

  return (
    <li className="flex items-center justify-between border-b py-2">
      <div className="flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          checked={note.completed}
          onChange={() => onToggle({ id: note.id, completed: !note.completed })}
        />

        {isEditing
          ? (
              <input
                ref={editInputRef}
                type="text"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyDown}
                className="flex-1 border-b focus:outline-none"
              />
            )
          : (
              <span
                className={cn('flex-1 cursor-text', {
                  'line-through': note.completed,
                })}
                onClick={() => setIsEditing(true)}
              >
                {draft}
              </span>
            )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(note.id)}
        className="ml-2 text-destructive"
      >
        ✕
      </button>
    </li>
  )
}
