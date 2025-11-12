// src/api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export const TodoAPI = {
  list: async () => (await api.get('/api/todos')).data.data,
  create: async (todo) => (await api.post('/api/todos', todo)).data.data,
  // Full update (replace) - use PUT to match server's `@PutMapping` for full updates
  update: async (id, patch) => (await api.put(`/api/todos/${id}`, patch)).data.data,
  // Partial update (toggle) - use PATCH to match server's `@PatchMapping` for toggling
  patch: async (id, patch) => (await api.patch(`/api/todos/${id}`, patch)).data.data,
  remove: async (id) => (await api.delete(`/api/todos/${id}`)).data.data,
};

export default TodoAPI;
