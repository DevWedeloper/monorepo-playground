import type { Note } from '../types/notes'
import { computed, Injectable } from '@angular/core'
import { injectMutation } from '@ngneat/query'
import { API_URL } from '../constants/api'

@Injectable({
  providedIn: 'root',
})
export class CreateNote {
  private mutation = injectMutation()

  private createNoteMutation = this.mutation({
    mutationFn: async ({ title }: { title: string }) => {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!res.ok)
        throw new Error('Failed to create note')

      const data = await res.json()
      return data as Pick<Note, 'id' | 'title'>
    },
  })

  private result = this.createNoteMutation.result

  data = computed(() => this.result().data)
  isLoading = computed(() => this.result().isPending)
  error = computed(() => this.result().error?.message)

  createNote(title: string): void {
    this.createNoteMutation.mutate({ title })
  }
}
