import type { ResourceLoaderParams, ResourceOptions } from '@angular/core'
import { isPlatformServer } from '@angular/common'
import { inject, makeStateKey, PLATFORM_ID, resource, TransferState } from '@angular/core'

// 🧩 Simple deterministic hash function
function hashString(value: string): string {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString()
}

/**
 * ssrResource(): Drop-in replacement for Angular's resource() that automatically
 * serializes + reuses data across SSR/CSR boundaries via TransferState.
 */
export function ssrResource<T, R = unknown>(options: ResourceOptions<T, R>) {
  const transferState = inject(TransferState)
  const platformId = inject(PLATFORM_ID)

  // 🧩 If the user provided a streaming loader, skip SSR transfer entirely.
  if (options.stream) {
    return resource(options)
  }

  // 🧩 If only a Promise-based loader is provided, enable SSR hydration.
  if (options.loader) {
    return resource<T, R>({
      ...options,
      loader: async (ctx: ResourceLoaderParams<R>) => {
        // Derive a stable key based on the loader + params
        const paramsPart = ctx.params ? JSON.stringify(ctx.params) : ''
        const loaderId = options.loader.name || 'anonymous'
        const hash = hashString(`${loaderId}:${paramsPart}`)
        const key = makeStateKey<T>(`ssr-resource-${hash}`)

        if (isPlatformServer(platformId)) {
          // 🟢 Server: run the loader and store the result
          const value = await options.loader!(ctx)
          transferState.set(key, value)
          return value
        }

        // 🟣 Client: reuse the SSR-transferred value if available
        const existing = transferState.get(key, null as T | null)
        if (existing !== null) {
          transferState.remove(key) // cleanup to save memory
          return existing
        }

        // 🌀 No preloaded data (client-only render or SPA navigation)
        return options.loader!(ctx)
      },
    })
  }

  throw new Error(
    '[ssrResource] Either `loader` or `stream` must be provided.',
  )
}
