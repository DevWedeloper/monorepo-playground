<script lang='ts'>
  import type { Note } from '../types/notes'
  import { cn } from '@/utils/cn'

  type Props = {
    note: Note
    onToggle: (payload: { id: number, completed: boolean }) => void
    onDelete: (id: number) => void
    onEdit: (payload: { id: number, title: string }) => void
  }

  const { note, onToggle, onDelete, onEdit }: Props = $props()

  let isEditing = $state(false)
  let draft = $state(note.title)
  let editInputRef: HTMLInputElement | null = $state(null)

  $effect(() => {
    if (isEditing && editInputRef) {
      editInputRef.focus()
    }
  })

  function handleEdit() {
    const trimmed = draft.trim()
    if (trimmed !== note.title) {
      onEdit({ id: note.id, title: trimmed })
    }
    isEditing = false
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleEdit()
    }
    else if (event.key === 'Escape') {
      draft = note.title
      isEditing = false
    }
  }
</script>

<li class='flex items-center justify-between border-b py-2'>
  <div class='flex flex-1 items-center gap-2'>
    <input
      type='checkbox'
      checked={note.completed}
      onchange={() => onToggle({ id: note.id, completed: !note.completed })}
    />

    {#if isEditing}
      <input
        bind:this={editInputRef}
        type='text'
        bind:value={draft}
        onblur={handleEdit}
        onkeydown={handleKeyDown}
        class='flex-1 border-b focus:outline-none'
      />
    {:else}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span
        class={cn('flex-1 cursor-text', { 'line-through': note.completed })}
        onclick={() => (isEditing = true)}
      >
        {draft}
      </span>
    {/if}
  </div>

  <button
    type='button'
    onclick={() => onDelete(note.id)}
    class='ml-2 text-destructive'
  >
    ✕
  </button>
</li>
