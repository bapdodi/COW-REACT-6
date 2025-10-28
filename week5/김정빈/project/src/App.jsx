import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

const formatDate = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedSelectedDate = localStorage.getItem('selectedDate');
    if (!savedSelectedDate) {
      return formatDate(new Date());
    }
    try {
      const parsed = JSON.parse(savedSelectedDate);
      return typeof parsed === 'string' ? parsed : formatDate(new Date());
    } catch {
      return savedSelectedDate;
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate);
    }
  }, [selectedDate]);

  // 할 일 추가 함수
  const addTodo = (todoData) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text: todoData.text, 
      time: todoData.time,
      date: todoData.date,
      completed: false 
    }]);
  };

  // 날짜 선택 함수
  const selectDate = (dateStr) => {
    setSelectedDate(dateStr);
  };

  // 할 일 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // 새로운 리스트를 만드는데 키가 일치하는거만 뺌 
  };

  // 할 일 저장 함수 (편집 완료)
  const saveTodo = (id, updatedData) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
  };

  // 할 일 완료/미완료 토글 함수
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="App max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List Calendar</h1>

      <div className="flex gap-5">
        {/* 캘린더 컴포넌트 */}
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={selectDate}
          todos={todos}
        />

        {/* 할 일 관리 영역 */}
        <div className="flex-1 space-y-4">
          <TodoList
            todos={todos}
            selectedDate={selectedDate}
            onSave={saveTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <TodoForm selectedDate={selectedDate} onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;