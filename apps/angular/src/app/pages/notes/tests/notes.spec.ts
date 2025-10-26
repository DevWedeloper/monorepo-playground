import { render, screen } from '@testing-library/angular'
import { NotesPage } from '../notes.page'

describe('notes', () => {
  it('renders notes page', async () => {
    await render(NotesPage)

    expect(screen.getByText('📝 Angular Notes')).toBeInTheDocument()
  })

  // describe('get', () => {})

  // describe('create', () => {})

  // describe('update', () => {})

  // describe('delete', () => {})
})
