'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-background flex w-64 flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Counter</h2>

        <p className="text-4xl font-bold">{count}</p>

        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-xl bg-indigo-500 px-4 py-2 font-medium text-white"
            onClick={increment}
          >
            +
          </button>

          <button
            type="button"
            className="rounded-xl bg-gray-400 px-4 py-2 font-medium text-white"
            onClick={decrement}
          >
            -
          </button>

          <button
            type="button"
            className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
