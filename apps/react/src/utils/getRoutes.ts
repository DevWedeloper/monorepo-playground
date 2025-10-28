import fs from 'node:fs'
import path from 'node:path'

// eslint-disable-next-line node/prefer-global/process
const appDir = path.join(process.cwd(), 'src', 'app')

export function getRoutes(dir = appDir, basePath = ''): string[] {
  let routes: string[] = []

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively get routes
      routes = routes.concat(getRoutes(fullPath, `${basePath}/${file}`))
    }
    else {
      // Only include route files
      if (file === 'page.jsx' || file === 'page.tsx') {
        routes.push(basePath.startsWith('/') ? basePath.slice(1) : basePath)
      }
    }
  }

  return routes
}
