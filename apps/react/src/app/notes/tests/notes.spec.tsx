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

  it('renders notes page', async () => {
    const page = await NotesPage()

    render(<NotesLayout>{page}</NotesLayout>)

    expect(screen.getByText('📝 React Notes')).toBeInTheDocument()
  })

  describe('get', () => {
    it('renders todos when the fetch is successful', async () => {
      const page = await NotesPage()

      render(<NotesLayout>{page}</NotesLayout>)

      expect(await screen.findByText('Test todo 1')).toBeInTheDocument()
      expect(await screen.findByText('Test todo 2')).toBeInTheDocument()
    })

    it('renders the empty state when fetching todos fails', async () => {
      server.use(getTodosError)

      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      expect(await screen.findByText('No tasks yet. Add one!')).toBeInTheDocument()
    })
  })

  describe('create', () => {
    it('adds a new note successfully', async () => {
      const page = await NotesPage()

      render(<NotesLayout>{page}</NotesLayout>)

      const input = screen.getByPlaceholderText('Add a new task...')
      const addButton = screen.getByRole('button', { name: /add/i })

      const loadingPre = screen.getByTestId('loading-states')

      await userEvent.type(input, 'New test note')
      await userEvent.click(addButton)

      expect(loadingPre.textContent).toContain('"createNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"createNote": false')
      })

      expect(await screen.findByText(/"title": "New test note"/)).toBeInTheDocument()
    })

    it('shows an error when creating a note fails', async () => {
      server.use(createTodoError)

      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      const input = screen.getByPlaceholderText('Add a new task...')
      const addButton = screen.getByRole('button', { name: /add/i })

      const successPre = screen.getByTestId('success-states')
      const errorPre = screen.getByTestId('error-states')
      const loadingPre = screen.getByTestId('loading-states')

      await userEvent.type(input, 'Fail note')
      await userEvent.click(addButton)

      expect(loadingPre.textContent).toContain('"createNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"createNote": false')
      })

      expect(successPre.textContent).toContain('"createNote": null')
      expect(errorPre.textContent).not.toContain('"createNote": null')
    })
  })

  describe('update', () => {
    it('updates a note successfully', async () => {
      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      const noteSpan = await screen.findByText('Test todo 1')

      const loadingPre = screen.getByTestId('loading-states')
      const successPre = screen.getByTestId('success-states')

      await userEvent.click(noteSpan)

      const editInput = screen.getByDisplayValue('Test todo 1')

      await userEvent.clear(editInput)
      await userEvent.type(editInput, 'Updated todo 1{Enter}')

      expect(loadingPre.textContent).toContain('"updateNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"updateNote": false')
      })

      await waitFor(() => {
        expect(successPre.textContent).toContain('"title": "Updated todo 1"')
      })

      expect(await screen.findByText('Updated todo 1')).toBeInTheDocument()
    })

    it('shows an error when updating a note fails', async () => {
      server.use(updateTodoError)

      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      const noteSpan = await screen.findByText('Test todo 1')

      const successPre = screen.getByTestId('success-states')
      const errorPre = screen.getByTestId('error-states')
      const loadingPre = screen.getByTestId('loading-states')

      await userEvent.click(noteSpan)

      const editInput = screen.getByDisplayValue('Test todo 1')

      await userEvent.clear(editInput)
      await userEvent.type(editInput, 'Updated todo 1{Enter}')

      expect(loadingPre.textContent).toContain('"updateNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"updateNote": false')
      })

      expect(successPre.textContent).toContain('"updateNote": null')
      expect(errorPre.textContent).not.toContain('"updateNote": null')
    })
  })

  describe('delete', () => {
    it('deletes a note successfully', async () => {
      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      const noteItem = await screen.findByText('Test todo 1')
      const deleteButton = noteItem.closest('li')?.querySelector('button')

      const loadingPre = screen.getByTestId('loading-states')
      const successPre = screen.getByTestId('success-states')

      await userEvent.click(deleteButton!)

      expect(loadingPre.textContent).toContain('"deleteNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"deleteNote": false')
      })

      expect(successPre.textContent).toContain('"deleteNote": {}')
    })

    it('shows an error when deleting a note fails', async () => {
      server.use(deleteTodoError)

      const page = await NotesPage()
      render(<NotesLayout>{page}</NotesLayout>)

      const noteItem = await screen.findByText('Test todo 1')
      const deleteButton = noteItem.closest('li')?.querySelector('button')

      const loadingPre = screen.getByTestId('loading-states')
      const successPre = screen.getByTestId('success-states')
      const errorPre = screen.getByTestId('error-states')

      await userEvent.click(deleteButton!)

      expect(loadingPre.textContent).toContain('"deleteNote": true')

      await waitFor(() => {
        expect(loadingPre.textContent).toContain('"deleteNote": false')
      })

      expect(successPre.textContent).toContain('"deleteNote": null')
      expect(errorPre.textContent).not.toContain('"deleteNote": null')
    })
  })
})
