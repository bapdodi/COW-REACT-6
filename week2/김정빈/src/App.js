import React, { useState } from 'react'; // react에서 userState 함수를 가져옴
import './App.css';

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState([]); //초기값을 빈 배열로 선언, setTodos는 변경 함수
  const [inputValue, setInputValue] = useState('');

  // 할 일 추가 함수
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue(''); // 입력창 비우기
    }
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
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      {/* 할 일 목록 표시 */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;