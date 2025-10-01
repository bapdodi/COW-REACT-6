import { useState } from 'react'; // react에서 userState 함수를 가져옴
import './App.css';

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState([]); //초기값을 빈 배열로 선언, setTodos는 변경 함수
  const [inputValue, setInputValue] = useState('');
  const [inputTime, setInputTime] = useState(''); // 시간 입력 상태
  const [inputDate, setInputDate] = useState(''); // 날짜 입력 상태
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // 선택된 날짜
  const [showCalendar, setShowCalendar] = useState(true); // 캘린더 표시 여부
  const [editingId, setEditingId] = useState(null); // 편집 중인 할 일의 ID
  const [editingText, setEditingText] = useState(''); // 편집 중인 텍스트
  const [editingTime, setEditingTime] = useState(''); // 편집 중인 시간
  const [editingDate, setEditingDate] = useState(''); // 편집 중인 날짜

  // 캘린더 생성 함수
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 일요일부터 시작
    
    const calendar = [];
    const currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const isCurrentMonth = currentDate.getMonth() === currentMonth;
        const isToday = dateStr === today.toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;
        const todoCount = todos.filter(todo => todo.date === dateStr).length;
        
        weekDays.push({
          date: new Date(currentDate),
          dateStr,
          isCurrentMonth,
          isToday,
          isSelected,
          todoCount
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
    }
    
    return calendar;
  };

  // 날짜 선택 함수
  const selectDate = (dateStr) => {
    setSelectedDate(dateStr);
    setInputDate(dateStr); // 새 할 일 추가시 선택된 날짜로 설정
  };

  // 선택된 날짜의 할 일 필터링
  const getSelectedDateTodos = () => {
    return todos.filter(todo => todo.date === selectedDate);
  };

  // 할 일 추가 함수
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const todoDate = inputDate || selectedDate; // 입력된 날짜가 없으면 선택된 날짜 사용
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        time: inputTime,
        date: todoDate,
        completed: false 
      }]);
      setInputValue(''); // 입력창 비우기
      setInputTime(''); // 시간 입력창 비우기
      setInputDate(selectedDate); // 날짜를 선택된 날짜로 재설정
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
  const startEdit = (id, text, time, date) => {
    setEditingId(id);
    setEditingText(text);
    setEditingTime(time || '');
    setEditingDate(date || '');
  };

  // 편집 저장 함수
  const saveEdit = (id) => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editingText, time: editingTime, date: editingDate } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
    setEditingTime('');
    setEditingDate('');
  };

  // 편집 취소 함수
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingTime('');
    setEditingDate('');
  };

  return ( // 화면에 표시할 HTML 같은 코드(JSX)를 반환
    <div className="App">
      <h1>Todo List Calendar</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 캘린더 영역 */}
        <div style={{ flex: 1 }}>
          <h2>캘린더</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '20px' }}>
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                {day}
              </div>
            ))}
            {generateCalendar().flat().map((dayInfo, index) => (
              <div
                key={index}
                onClick={() => selectDate(dayInfo.dateStr)}
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: dayInfo.isSelected ? '#007bff' : dayInfo.isToday ? '#e7f3ff' : dayInfo.isCurrentMonth ? 'white' : '#f5f5f5',
                  color: dayInfo.isSelected ? 'white' : dayInfo.isCurrentMonth ? 'black' : '#ccc',
                  border: '1px solid #ddd',
                  position: 'relative'
                }}
              >
                {dayInfo.date.getDate()}
                {dayInfo.todoCount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {dayInfo.todoCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 할 일 관리 영역 */}
        <div style={{ flex: 1 }}>
          <h2>{selectedDate} 할 일</h2>
          
          {/* 할 일 입력 폼 */}
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="할 일을 입력하세요"
              style={{ width: '200px', marginRight: '10px' }}
            />
            <input 
              type="date" 
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input 
              type="time" 
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button onClick={addTodo}>추가</button>
          </div>

          {/* 할 일 목록 표시 */}
          <ul>
            {getSelectedDateTodos().map(todo => (
              <li key={todo.id}>
                {editingId === todo.id ? (
                  // 편집 모드
                  <>
                    <input 
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(todo.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                    <input 
                      type="date"
                      value={editingDate}
                      onChange={(e) => setEditingDate(e.target.value)}
                    />
                    <input 
                      type="time"
                      value={editingTime}
                      onChange={(e) => setEditingTime(e.target.value)}
                    />
                    <button onClick={() => saveEdit(todo.id)}>저장</button>
                    <button onClick={cancelEdit}>취소</button>
                  </>
                ) : (
                  // 일반 모드
                  <>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                      {todo.date && <span style={{ color: 'green', marginLeft: '10px' }}>[{todo.date}]</span>}
                      {todo.time && <span style={{ color: 'blue', marginLeft: '5px' }}>({todo.time})</span>}
                    </span>
                    <button onClick={() => startEdit(todo.id, todo.text, todo.time, todo.date)}>수정</button>
                    <button onClick={() => toggleTodo(todo.id)}>
                      {todo.completed ? '미완료' : '완료'}
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;