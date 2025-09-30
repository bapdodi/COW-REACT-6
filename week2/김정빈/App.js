import React, { useState } from 'react'; // react에서 userState 함수를 가져옴
import './App.css';

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState([]); //초기값을 빈 배열로 선언
  const [inputValue, setInputValue] = useState('');

  return ( // 화면에 표시할 HTML 같은 코드(JSX)를 반환
    <div className="App">
      <h1>Todo List</h1>
      {/* 여기에 할 일 입력 폼과 리스트가 들어갈 예정 */}
    </div>
  );
}

export default App;