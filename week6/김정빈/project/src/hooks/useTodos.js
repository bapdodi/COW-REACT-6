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
    await TodoAPI.update(id, updatedData);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
  };

  const toggleTodo = async (id) => {
    await TodoAPI.patch(id, { completed: !todos.find((todo) => todo.id === id).completed });
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return { todos, addTodo, deleteTodo, saveTodo, toggleTodo };
}
