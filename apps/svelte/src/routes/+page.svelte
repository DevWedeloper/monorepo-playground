<script lang='ts'>
  const routes = Object.keys(
    import.meta.glob('/src/routes/**/+page.svelte', {
      eager: true,
    }),
  ).map(key => key.replace(/\/src\/routes\/|\/?\+page\.svelte/g, '')).sort((a, b) => a.localeCompare(b))
</script>

<section class='max-w-3xl mx-auto text-center space-y-8'>
  <header>
    <h1 class='text-4xl font-bold text-primary mb-2'>
      Welcome to Svelte Playground!
    </h1>
    <p class='text-muted-foreground text-lg'>
      Check out the following examples to see how different things are done in Svelte.
    </p>
  </header>

  <hr class='border-t border-border my-6' />

  <ul class='grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
    {#each routes as route (route)}
      <li>
        <a
          href='/{route}'
          class='block p-4 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground shadow-sm transition-all duration-200'
        >
          /{route}
        </a>
      </li>
    {/each}
  </ul>
</section>
