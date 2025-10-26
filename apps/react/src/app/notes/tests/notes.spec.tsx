import { render, screen } from '@testing-library/react'
import NotesLayout from '../layout'
import NotesPage from '../page'

describe('notes', () => {
  it('renders notes page', async () => {
    const page = await NotesPage()

    render(<NotesLayout>{page}</NotesLayout>)

    expect(screen.getByText('📝 React Notes')).toBeInTheDocument()
  })

  // describe('get', () => {})

  // describe('create', () => {})

  // describe('update', () => {})

  // describe('delete', () => {})
})
