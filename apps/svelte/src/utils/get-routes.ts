export function getRoutes() {
  const routeFiles = import.meta.glob('/src/routes/**/+page.svelte', { eager: true })

  return Object.keys(routeFiles)
    .map(key => key.replace(/\/src\/routes\/|\/?\+page\.svelte/g, ''))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}
