import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '../constants/api'
import { Note } from '../types/notes'

export function useUpdateNote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({
      id,
      title,
      completed,
    }: {
      id: number
      title?: string
      completed?: boolean
    }) => {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed }),
      })

      if (!res.ok) {
        throw new Error('Failed to update note')
      }

      const data = await res.json()
      return data as { id: number } & Partial<Pick<Note, 'title' | 'completed'>>
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return {
    updateNote: (
      id: number,
      updates: { title?: string, completed?: boolean },
    ) => mutation.mutate({ id, ...updates }),
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
  }
}
