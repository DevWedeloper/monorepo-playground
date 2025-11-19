import type { Note } from '../types/notes'
import { computed, Injectable } from '@angular/core'
import { injectMutation } from '@ngneat/query'
import { API_URL } from '../constants/api'

@Injectable({
  providedIn: 'root',
})
export class UpdateNote {
  private mutation = injectMutation()

  private updateNoteMutation = this.mutation({
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

      if (!res.ok)
        throw new Error('Failed to update note')

      const data = await res.json()
      return data as { id: number } & Partial<Pick<Note, 'title' | 'completed'>>
    },
  })

  private result = this.updateNoteMutation.result

  data = computed(() => this.result().data)
  isLoading = computed(() => this.result().isPending)
  error = computed(() => this.result().error?.message)

  updateNote(id: number, updates: { title?: string, completed?: boolean }): void {
    this.updateNoteMutation.mutate({ id, ...updates })
  }
}
