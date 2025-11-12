import { useNavigate, useParams } from 'react-router-dom';
import useTodos from '../hooks/useTodos';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos } = useTodos();

  const todo = todos.find((t) => String(t.id) === String(id));

  if (!todo) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h2>할 일을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate(-1)}>뒤로</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2>할 일 상세</h2>
      <p>id: {todo.id}</p>
      <p>text: {todo.text}</p>
      {todo.date && <p>date: {todo.date}</p>}
      {todo.time && <p>time: {todo.time}</p>}
      <p>completed: {String(todo.completed)}</p>
      <button onClick={() => navigate(-1)}>뒤로</button>
    </div>
  );
}
