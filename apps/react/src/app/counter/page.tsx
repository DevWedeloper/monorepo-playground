'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-background rounded-2xl shadow-sm w-64">
        <h2 className="text-2xl font-semibold">Counter</h2>

        <p className="text-4xl font-bold">{count}</p>

        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-xl"
            onClick={increment}
          >
            +
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white font-medium rounded-xl"
            onClick={decrement}
          >
            -
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-xl"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
