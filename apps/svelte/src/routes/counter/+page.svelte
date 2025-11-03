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

<div class='flex items-center justify-center min-h-screen'>
  <div class='flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-2xl shadow-sm w-64'>
    <h2 class='text-2xl font-semibold'>Counter</h2>

    <p class='text-4xl font-bold'>{count}</p>

    <div class='flex gap-3'>
      <button
        class='px-4 py-2 bg-indigo-500 text-white font-medium rounded-xl'
        onclick={increment}
      >
        +
      </button>

      <button
        class='px-4 py-2 bg-gray-400 text-white font-medium rounded-xl'
        onclick={decrement}
      >
        -
      </button>

      <button
        class='px-4 py-2 bg-red-500 text-white font-medium rounded-xl'
        onclick={reset}
      >
        Reset
      </button>
    </div>
  </div>
</div>
