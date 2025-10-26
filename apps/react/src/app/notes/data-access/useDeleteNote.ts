import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '../constants/api'

export function useDeleteNote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete note')
      }

      const data = await res.json()
      return data as Record<string, never>
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  return {
    deleteNote: (id: number) => mutation.mutate({ id }),
    data: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
  }
}
