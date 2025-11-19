<script lang='ts'>
  import { createNoteMutation } from './data-access/createNote'
  import { deleteNoteMutation } from './data-access/deleteNote'
  import { getNotesQuery } from './data-access/getNotes'
  import { updateNoteMutation } from './data-access/updateNote'
  import NoteInput from './ui/NoteInput.svelte'
  import NoteList from './ui/NoteList.svelte'

  const getNotes = getNotesQuery()

  const createNote = createNoteMutation()

  const updateNote = updateNoteMutation()

  const deleteNote = deleteNoteMutation()

  function handleAdd(title: string) {
    createNote.mutate({ title })
  }

  function handleToggle(payload: { id: number, completed: boolean }) {
    updateNote.mutate({ id: payload.id, completed: payload.completed })
  }

  function handleDelete(id: number) {
    deleteNote.mutate({ id })
  }

  function handleEdit(payload: { id: number, title: string }) {
    updateNote.mutate({ id: payload.id, title: payload.title })
  }
</script>

<div class='flex flex-col items-center p-6'>
  <div class='relative w-full max-w-md rounded-2xl p-6 shadow-lg'>
    <h1 class='mb-4 text-center text-2xl font-bold'>📝 Svelte Notes</h1>

    <div class='mb-4 flex flex-col items-center text-sm'>
      <h3 class='font-semibold'>Data States</h3>
      <pre class='whitespace-pre-wrap' data-testid='success-states'>{JSON.stringify(
          {
            deleteNote: deleteNote.data || null,
            updateNote: updateNote.data || null,
            createNote: createNote.data || null,
          },
          null,
          2,
        )}
      </pre>

      <h3 class='mt-2 font-semibold'>Loading States</h3>
      <pre data-testid='loading-states'>{JSON.stringify(
          {
            getNotes: getNotes.isPending,
            deleteNote: deleteNote.isPending,
            updateNote: updateNote.isPending,
            createNote: createNote.isPending,
          },
          null,
          2,
        )}
      </pre>

      <h3 class='mt-2 font-semibold'>Error States</h3>
      <pre class='whitespace-pre-wrap' data-testid='error-states'>{JSON.stringify(
          {
            getNotes: getNotes.error,
            deleteNote: deleteNote.error,
            updateNote: updateNote.error,
            createNote: createNote.error,
          },
          null,
          2,
        )}
      </pre>
    </div>

    <NoteInput onAdd={handleAdd} />

    <NoteList
      notes={getNotes.data ?? []}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  </div>
</div>
