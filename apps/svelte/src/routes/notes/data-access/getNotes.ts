import type { Note } from '../types/notes'
import { createQuery } from '@tanstack/svelte-query'
import { API_URL } from '../constants/api'

export const NOTES_QUERY_KEY = ['notes']

type FetchNotesArgs = {
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export async function fetchNotes({ fetch = window.fetch, signal }: FetchNotesArgs = {}) {
  const res = await fetch(`${API_URL}/todos?_limit=10`, { signal })
  if (!res.ok) {
    throw new Error('Failed to fetch notes')
  }
  return res.json() as Promise<Note[]>
}

export function getNotesQuery() {
  const queryStore = createQuery<Note[], Error>(() => ({
    queryKey: NOTES_QUERY_KEY,
    queryFn: fetchNotes,
  }))

  return queryStore
}
