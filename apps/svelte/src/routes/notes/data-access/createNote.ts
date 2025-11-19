import type { Note } from '../types/notes'
import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { API_URL } from '../constants/api'

interface CreateNoteInput { title: string }
type CreateNoteOutput = Pick<Note, 'id' | 'title'>

export function createNoteMutation() {
  const queryClient = useQueryClient()

  const mutationStore = createMutation(() => ({
    mutationFn: async ({ title }: CreateNoteInput) => {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!res.ok) {
        throw new Error('Failed to create note')
      }

      return (await res.json()) as CreateNoteOutput
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  }))

  return mutationStore
}
