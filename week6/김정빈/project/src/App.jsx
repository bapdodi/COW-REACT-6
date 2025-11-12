import { Route, Routes } from 'react-router-dom';
import './App.css';
import Calendar from './components/Calendar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import useSelectedDate from './hooks/useSelectedDate';
import useTodos from './hooks/useTodos';
import TodoDetail from './pages/TodoDetail.jsx';

function Main() {
  const { todos, addTodo, deleteTodo, saveTodo, toggleTodo } = useTodos();
  const { selectedDate, selectDate } = useSelectedDate();

  return (
    <div className="App max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List Calendar</h1>

      <div className="flex gap-5">
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={selectDate}
          todos={todos}
        />

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
    </Routes>
  );
}

export default App;