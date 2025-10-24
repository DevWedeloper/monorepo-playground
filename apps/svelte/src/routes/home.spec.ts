import { render, screen } from '@testing-library/svelte'
import * as routesModule from '@/utils/get-routes'
import Home from './+page.svelte'

describe('home.svelte', () => {
  vi.spyOn(routesModule, 'getRoutes').mockReturnValue(['about', 'example'])

  it('renders the welcome header', async () => {
    render(Home)
    expect(screen.getByText('Welcome to Svelte Playground!')).toBeVisible()
  })

  it('renders router links', async () => {
    render(Home)

    const links = screen.getAllByRole('link')
    expect(links.map(l => l.textContent?.trim())).toEqual(['/about', '/example'])
  })
})
