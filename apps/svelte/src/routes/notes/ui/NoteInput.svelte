<script lang='ts'>
  type Props = {
    onAdd: (title: string) => void
  }

  const { onAdd }: Props = $props()

  let value = $state('')

  function handleSubmit(event: Event) {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed)
      return
    onAdd(trimmed)
    value = ''
  }
</script>

<form onsubmit={handleSubmit} class='flex gap-2'>
  <input
    type='text'
    bind:value={value}
    name='note-input'
    placeholder='Add a new task...'
    class='flex-1 rounded-lg border px-3 py-2'
  />
  <button type='submit' class='rounded-lg px-4 py-2 bg-accent'>
    Add
  </button>
</form>
