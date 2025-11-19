import Link from 'next/link'
import { getRoutes } from '@/utils/getRoutes'

export default function Home() {
  const routes = getRoutes()
    .filter((path): path is string => !!path)
    .sort((a, b) => a.localeCompare(b))

  return (
    <div className="p-8">
      <section className="mx-auto max-w-3xl space-y-8 text-center">
        <header>
          <h1 className="text-primary mb-2 text-4xl font-bold">
            Welcome to React Playground!
          </h1>
          <p className="text-muted-foreground text-lg">
            Check out the following examples to see how different things are done in React.
          </p>
        </header>

        <hr className="border-border my-6 border-t" />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {routes.map(route => (
            <li key={route}>
              <Link
                href={`/${route}`}
                className="border-border bg-card block rounded-lg border p-4 shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
              >
                /
                {route}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
