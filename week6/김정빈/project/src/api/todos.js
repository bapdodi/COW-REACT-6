// src/api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export const TodoAPI = {
  list: async () => (await api.get('/api/todos')).data.data,
  create: async (todo) => (await api.post('/api/todos', todo)).data.data,
  update: async (id, patch) => (await api.put(`/api/todos/${id}`, patch)).data.data,
  patch: async (id, patch) => (await api.patch(`/api/todos/${id}`, patch)).data.data,
  remove: async (id) => (await api.delete(`/api/todos/${id}`)).data.data,
};

export default TodoAPI;
