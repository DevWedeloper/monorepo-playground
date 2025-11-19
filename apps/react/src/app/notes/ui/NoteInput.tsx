import { useState } from 'react'

interface Props {
  onAdd: (title: string) => void
}

export const NoteInput: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed)
      return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        name="note-input"
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        className="bg-accent rounded-lg px-4 py-2"
      >
        Add
      </button>
    </form>
  )
}
