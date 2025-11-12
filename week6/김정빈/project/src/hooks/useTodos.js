import { useEffect } from 'react';
import TodoAPI from '../api/todos';
import useLocalStorage from './useLocalStorage';


export default function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  useEffect(() => {
    (async () => {
      const data = await TodoAPI.list();
      setTodos(data);
    })();
  }, [setTodos]);

  const addTodo = async ({ text, time, date }) => {
    const tempId = `tmp-${Date.now()}`;
    const newTodo = { id: tempId, text, time, date, completed: false };
    const savedTodo = await TodoAPI.create(newTodo);
    setTodos((prev) => [
      ...prev,
      savedTodo,
    ]);
  };

  const deleteTodo = async (id) => {
    await TodoAPI.remove(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const saveTodo = async(id, updatedData) => {
    // guard: if id is not a numeric id (e.g. temporary client id like 'tmp-...'),
    // skip update and log a warning — client must wait for server-assigned id.
    if (typeof id !== 'number' && !/^[0-9]+$/.test(String(id))) {
      console.warn('Attempted to save a todo with non-numeric id; wait for server to assign id.', id, updatedData);
      return;
    }
    try {
      await TodoAPI.update(id, updatedData);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
    } catch (err) {
      console.error('Failed to save todo', err?.response ?? err);
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    if (typeof id !== 'number' && !/^[0-9]+$/.test(String(id))) {
      console.warn('Attempted to toggle a todo with non-numeric id; wait for server to assign id.', id);
      return;
    }
    try {
      await TodoAPI.patch(id, { completed: !todos.find((todo) => todo.id === id).completed });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    } catch (err) {
      console.error('Failed to toggle todo', err?.response ?? err);
      throw err;
    }
  };

  return { todos, addTodo, deleteTodo, saveTodo, toggleTodo };
}
