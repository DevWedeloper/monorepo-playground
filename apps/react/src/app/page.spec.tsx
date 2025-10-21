import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Home from './page'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe('home component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders without crashing', () => {
    render(<Home />)
  })

  it('renders the Next.js logo', () => {
    render(<Home />)
    const main = screen.getByRole('main')
    const logo = within(main).getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })
})
