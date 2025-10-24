import { render, screen } from '@testing-library/react'
import * as routesModule from '@/utils/get-routes'
import Home from './page'

vi.spyOn(routesModule, 'getRoutes').mockReturnValue(['about', 'example'])

describe('home page', () => {
  it('renders the welcome header', () => {
    render(<Home />)

    expect(screen.getByText('Welcome to React Playground!')).toBeVisible()
  })

  it('renders router links', async () => {
    render(<Home />)

    const links = screen.getAllByRole('link')
    expect(links.map(l => l.textContent?.trim())).toEqual(['/about', '/example'])
  })
})
