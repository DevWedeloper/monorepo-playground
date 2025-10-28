<script lang='ts'>
  import { QueryClientProvider } from '@tanstack/svelte-query'

  const { children, data } = $props()
</script>

<QueryClientProvider client={data.queryClient}>
  {@render children?.()}
</QueryClientProvider>
