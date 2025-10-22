import Link from 'next/link'
import { getRoutes } from '@/utils/get-routes'

export default function Home() {
  const routes = getRoutes()
    .filter((path): path is string => !!path)
    .sort((a, b) => a.localeCompare(b))

  return (
    <section className="max-w-3xl mx-auto text-center space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome to React Playground!
        </h1>
        <p className="text-muted-foreground text-lg">
          Check out the following examples to see how different things are done in React.
        </p>
      </header>

      <hr className="border-t border-border my-6" />

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {routes.map(route => (
          <li key={route}>
            <Link
              href={`/${route}`}
              className="block p-4 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground shadow-sm transition-all duration-200"
            >
              /
              {route}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
