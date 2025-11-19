<script>
  let count = $state(0)

  function increment() {
    count++
  }

  function decrement() {
    count--
  }

  function reset() {
    count = 0
  }
</script>

<div class='flex min-h-screen items-center justify-center'>
  <div class='bg-background flex w-64 flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-sm'>
    <h2 class='text-2xl font-semibold'>Counter</h2>

    <p class='text-4xl font-bold'>{count}</p>

    <div class='flex gap-3'>
      <button
        class='rounded-xl bg-indigo-500 px-4 py-2 font-medium text-white'
        onclick={increment}
      >
        +
      </button>

      <button
        class='rounded-xl bg-gray-400 px-4 py-2 font-medium text-white'
        onclick={decrement}
      >
        -
      </button>

      <button
        class='rounded-xl bg-red-500 px-4 py-2 font-medium text-white'
        onclick={reset}
      >
        Reset
      </button>
    </div>
  </div>
</div>
