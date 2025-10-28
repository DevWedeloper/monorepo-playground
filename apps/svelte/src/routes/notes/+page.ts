import type { PageLoad } from './$types'
import { fetchNotes, NOTES_QUERY_KEY } from './data-access/getNotes'

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: NOTES_QUERY_KEY,
    queryFn: () => fetchNotes({ fetch }),
  })
}
