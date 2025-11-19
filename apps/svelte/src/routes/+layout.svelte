<script lang='ts'>
  import favicon from '$lib/assets/favicon.svg'
  import '../app.css'

  const { children } = $props()
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
</svelte:head>

<main class='bg-background text-foreground block min-h-screen font-sans'>
  {@render children?.()}
</main>
