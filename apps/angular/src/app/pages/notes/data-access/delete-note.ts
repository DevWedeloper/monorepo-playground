import { computed, Injectable } from '@angular/core'
import { injectMutation } from '@ngneat/query'
import { API_URL } from '../constants/api'

@Injectable({
  providedIn: 'root',
})
export class DeleteNote {
  private mutation = injectMutation()

  private deleteNoteMutation = this.mutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok)
        throw new Error('Failed to delete note')

      const data = await res.json()
      return data as Record<string, never>
    },
  })

  private result = this.deleteNoteMutation.result

  data = computed(() => this.result().data)
  isLoading = computed(() => this.result().isPending)
  error = computed(() => this.result().error?.message)

  deleteNote(id: number): void {
    this.deleteNoteMutation.mutate({ id })
  }
}
