<script lang='ts'>
  import { browser } from '$app/environment'
  import { QueryClient } from '@tanstack/svelte-query'
  import { onMount } from 'svelte'
  import NotesLayout from '../+layout.svelte'
  import NotesPage from '../+page.svelte'
  import { fetchNotes, NOTES_QUERY_KEY } from '../data-access/getNotes'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000,
      },
    },
  })

  onMount(() => {
    queryClient.prefetchQuery({
      queryKey: NOTES_QUERY_KEY,
      queryFn: () => fetchNotes(),
    })
  })
</script>

<NotesLayout data={{ queryClient }}>
  <NotesPage />
</NotesLayout>
