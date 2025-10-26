import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { fetchNotes, NOTES_QUERY_KEY } from './data-access/useGetNotes'
import NotesClient from './NotesClient'

export default async function NotesPage() {
  const queryClient = new QueryClient()

  // prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: NOTES_QUERY_KEY,
    queryFn: fetchNotes,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  )
}
