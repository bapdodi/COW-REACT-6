import { useState } from 'react'; // react에서 userState 함수를 가져옴
import './App.css';

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState([]); //초기값을 빈 배열로 선언, setTodos는 변경 함수
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null); // 편집 중인 할 일의 ID
  const [editingText, setEditingText] = useState(''); // 편집 중인 텍스트

  // 할 일 추가 함수
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue(''); // 입력창 비우기
    }
  };

  // 할 일 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // 새로운 리스트를 만드는데 키가 일치하는거만 뺌 
  };

  // 할 일 완료/미완료 토글 함수
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 편집 시작 함수
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // 편집 저장 함수
  const saveEdit = (id) => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editingText } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  // 편집 취소 함수
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return ( // 화면에 표시할 HTML 같은 코드(JSX)를 반환
    <div className="App">
      <h1>Todo List</h1>
      
      {/* 할 일 입력 폼 */}
      <div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()} // 엔터로도 등록할 수 있게 추가
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      {/* 할 일 목록 표시 */}
      <ul>
        {todos.map(todo => ( //각각의 todo
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '미완료' : '완료'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;