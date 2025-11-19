import type { Note } from '../types/notes'
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../constants/api'

export const NOTES_QUERY_KEY = ['notes']

export async function fetchNotes({ signal }: { signal?: AbortSignal }) {
  const res = await fetch(`${API_URL}/todos?_limit=10`, { signal })
  if (!res.ok) {
    throw new Error('Failed to fetch notes')
  }
  return res.json() as Promise<Note[]>
}

export function useGetNotes() {
  const query = useQuery<Note[], Error>({
    queryKey: NOTES_QUERY_KEY,
    queryFn: fetchNotes,
  })

  return {
    notes: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  }
}
