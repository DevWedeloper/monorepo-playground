import { delay, http, HttpResponse } from 'msw'
import { API_URL } from '../../constants/api'

export const handlers = [
  http.get(`${API_URL}/todos?_limit=10`, () => {
    return HttpResponse.json([
      { userId: 1, id: 1, title: 'Test todo 1', completed: false },
      { userId: 1, id: 2, title: 'Test todo 2', completed: true },
    ])
  }),

  http.post(`${API_URL}/todos`, async () => {
    await delay()
    return HttpResponse.json({ id: 101, title: 'New test note' })
  }),

  http.put(`${API_URL}/todos/:id`, async () => {
    await delay()
    return HttpResponse.json({ id: 1, title: 'Updated todo 1', completed: true })
  }),

  http.delete(`${API_URL}/todos/:id`, async () => { 
    await delay()
    return HttpResponse.json({}) 
  }),
]

export const getTodosError = http.get(`${API_URL}/todos?_limit=10`, () => {
  return new HttpResponse({
    status: 500,
    body: { error: 'Internal Server Error' },
  });
});

export const createTodoError = http.post(`${API_URL}/todos`, async () => {
  await delay();
  return new HttpResponse({
    status: 400,
    body: { error: 'Failed to create todo' },
  });
});

export const updateTodoError = http.put(`${API_URL}/todos/:id`, async () => {
  await delay();
  return new HttpResponse({
    status: 400,
    body: { error: 'Failed to update todo' },
  });
});

export const deleteTodoError = http.delete(`${API_URL}/todos/:id`, async () => {
  await delay();
  return new HttpResponse({
    status: 400,
    body: { error: 'Failed to delete todo' },
  });
});
