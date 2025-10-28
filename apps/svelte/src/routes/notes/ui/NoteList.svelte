<script lang='ts'>
  import type { Note } from '../types/notes'
  import NoteItem from './NoteItem.svelte'

  type Props = {
    notes: Note[]
    onToggle: (payload: { id: number, completed: boolean }) => void
    onDelete: (id: number) => void
    onEdit: (payload: { id: number, title: string }) => void
  }

  const { notes, onToggle, onDelete, onEdit }: Props = $props()
</script>

{#if notes.length === 0}
  <p class='mt-4 text-center'>No tasks yet. Add one!</p>
{:else}
  <ul class='mt-4'>
    {#each notes as note (note.id)}
      <NoteItem
        {note}
        {onToggle}
        {onDelete}
        {onEdit}
      />
    {/each}
  </ul>
{/if}
