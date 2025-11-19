import type { Note } from '../types/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '../constants/api'

export function useCreateNote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!res.ok) {
        throw new Error('Failed to create note')
      }

      const data = await res.json()
      return data as Pick<Note, 'id' | 'title'>
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return {
    createNote: (title: string) => mutation.mutate({ title }),
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
  }
}
