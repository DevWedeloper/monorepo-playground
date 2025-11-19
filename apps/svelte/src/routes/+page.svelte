<script lang='ts'>
  import { getRoutes } from '@/utils/getRoutes'

  const routes = getRoutes()
</script>

<div class='p-8'>
  <section class='mx-auto max-w-3xl space-y-8 text-center'>
    <header>
      <h1 class='text-primary mb-2 text-4xl font-bold'>
        Welcome to Svelte Playground!
      </h1>
      <p class='text-muted-foreground text-lg'>
        Check out the following examples to see how different things are done in Svelte.
      </p>
    </header>

    <hr class='border-border my-6 border-t' />

    <ul class='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {#each routes as route (route)}
        <li>
          <a
            href='/{route}'
            class='border-border bg-card block rounded-lg border p-4 shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground'
          >
            /{route}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
