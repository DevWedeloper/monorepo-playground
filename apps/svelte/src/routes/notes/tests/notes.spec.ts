import { render, screen, waitFor } from '@testing-library/svelte'
import NotesPage from './notes.spec.svelte'

describe('notes', () => {
  const getPreStates = () => ({
    loading: screen.getByTestId('loading-states'),
    success: screen.getByTestId('success-states'),
    error: screen.getByTestId('error-states'),
  })

  const waitForLoading = async (key: string) => {
    const { loading } = getPreStates()
    expect(loading.textContent).toContain(`"${key}": true`)
    await waitFor(() => expect(loading.textContent).toContain(`"${key}": false`))
  }

  const renderNotesPage = async () => {
    render(NotesPage)
    await waitForLoading('getNotes')
  }

  it('renders notes page', async () => {
    await renderNotesPage()
    expect(screen.getByText('📝 Svelte Notes')).toBeInTheDocument()
  })

  // describe('get', () => {})

  // describe('create', () => {})

  // describe('update', () => {})

  // describe('delete', () => {})
})
