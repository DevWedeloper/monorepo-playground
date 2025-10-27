import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NotesLayout from '../layout'
import NotesPage from '../page'
import { createTodoError, deleteTodoError, getTodosError, updateTodoError } from './mocks/handlers'
import { server } from './mocks/server'

describe('notes', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const renderNotesPage = async () => {
    const page = await NotesPage()
    render(<NotesLayout>{page}</NotesLayout>)
  }

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

  it('renders notes page', async () => {
    await renderNotesPage()
    expect(screen.getByText('📝 React Notes')).toBeInTheDocument()
  })

  describe('get', () => {
    it('renders todos when the fetch is successful', async () => {
      await renderNotesPage()
      expect(await screen.findByText('Test todo 1')).toBeInTheDocument()
      expect(await screen.findByText('Test todo 2')).toBeInTheDocument()
    })

    it('renders the empty state when fetching todos fails', async () => {
      server.use(getTodosError)
      await renderNotesPage()
      expect(await screen.findByText('No tasks yet. Add one!')).toBeInTheDocument()
    })
  })

  describe('create', () => {
    const addNote = async (text: string) => {
      const input = screen.getByPlaceholderText('Add a new task...')
      const addButton = screen.getByRole('button', { name: /add/i })
      await userEvent.type(input, text)
      await userEvent.click(addButton)
    }

    it('adds a new note successfully', async () => {
      await renderNotesPage()

      await addNote('New test note')
      await waitForLoading('createNote')
      expect(await screen.findByText(/"title": "New test note"/)).toBeInTheDocument()
    })

    it('shows an error when creating a note fails', async () => {
      server.use(createTodoError)
      await renderNotesPage()
      const { success, error } = getPreStates()

      await addNote('Fail note')
      await waitForLoading('createNote')
      expect(success.textContent).toContain('"createNote": null')
      expect(error.textContent).not.toContain('"createNote": null')
    })
  })

  describe('update', () => {
    const editNote = async (oldText: string, newText: string) => {
      const noteSpan = await screen.findByText(oldText)
      await userEvent.click(noteSpan)
      const editInput = screen.getByDisplayValue(oldText)
      await userEvent.clear(editInput)
      await userEvent.type(editInput, `${newText}{Enter}`)
    }

    it('updates a note successfully', async () => {
      await renderNotesPage()
      const { success } = getPreStates()

      await editNote('Test todo 1', 'Updated todo 1')
      await waitForLoading('updateNote')
      await waitFor(() => expect(success.textContent).toContain('"title": "Updated todo 1"'))
      expect(await screen.findByText('Updated todo 1')).toBeInTheDocument()
    })

    it('shows an error when updating a note fails', async () => {
      server.use(updateTodoError)
      await renderNotesPage()
      const { success, error } = getPreStates()

      await editNote('Test todo 1', 'Updated todo 1')
      await waitForLoading('updateNote')
      expect(success.textContent).toContain('"updateNote": null')
      expect(error.textContent).not.toContain('"updateNote": null')
    })
  })

  describe('delete', () => {
    const deleteNote = async (text: string) => {
      const noteItem = await screen.findByText(text)
      const deleteButton = noteItem.closest('li')?.querySelector('button')
      await userEvent.click(deleteButton!)
    }

    it('deletes a note successfully', async () => {
      await renderNotesPage()
      const { success } = getPreStates()

      await deleteNote('Test todo 1')
      await waitForLoading('deleteNote')
      expect(success.textContent).toContain('"deleteNote": {}')
    })

    it('shows an error when deleting a note fails', async () => {
      server.use(deleteTodoError)
      await renderNotesPage()
      const { success, error } = getPreStates()

      await deleteNote('Test todo 1')
      await waitForLoading('deleteNote')
      expect(success.textContent).toContain('"deleteNote": null')
      expect(error.textContent).not.toContain('"deleteNote": null')
    })
  })
})
