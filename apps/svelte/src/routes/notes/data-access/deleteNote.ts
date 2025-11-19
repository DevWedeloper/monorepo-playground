import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { API_URL } from '../constants/api'

interface DeleteNoteInput { id: number }
type DeleteNoteOutput = Record<string, never>

export function deleteNoteMutation() {
  const queryClient = useQueryClient()

  const mutationStore = createMutation(() => ({
    mutationFn: async ({ id }: DeleteNoteInput) => {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete note')
      }

      return (await res.json()) as DeleteNoteOutput
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  }))

  return mutationStore
}
