import type { Note } from '../types/notes'
import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { API_URL } from '../constants/api'

type UpdateNoteInput = {
  id: number
  title?: string
  completed?: boolean
}

type UpdateNoteOutput = { id: number } & Partial<Pick<Note, 'title' | 'completed'>>

export function updateNoteMutation() {
  const queryClient = useQueryClient()

  const mutationStore = createMutation(() => ({
    mutationFn: async ({ id, title, completed }: UpdateNoteInput) => {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed }),
      })

      if (!res.ok) {
        throw new Error('Failed to update note')
      }

      return (await res.json()) as UpdateNoteOutput
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  }))

  return mutationStore
}
