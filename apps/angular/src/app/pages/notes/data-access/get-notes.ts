import { computed, Injectable } from '@angular/core'
import { ssrResource } from '@/utils/ssr-resource'
import { API_URL } from '../constants/api'
import { Note } from '../types/notes'

@Injectable({
  providedIn: 'root',
})
export class GetNotes {
  private notesResource = ssrResource<Note[], unknown>({
    loader: ({ abortSignal }) => fetch(`${API_URL}/todos?_limit=10`, {
      signal: abortSignal,
    }).then(res => res.json()),
  })

  notes = computed(() => {
    if (this.notesResource.hasValue()) {
      return this.notesResource.value()
    }
    return []
  })

  isLoading = computed(() => this.notesResource.isLoading())
  error = computed(() => this.notesResource.error()?.message)

  getNotes(): void {
    this.notesResource.reload()
  }
}
