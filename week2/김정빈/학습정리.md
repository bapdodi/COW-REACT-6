* export default App; // "다른 파일에서 이 App 컴포넌트를 사용할 수 있게 내보내기"
- import App from './App'; // App.js에서 내보낸 App 컴포넌트를 가져오기
* useState : 초기값 설정
* setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]); 새로운 객체를 만들어서 복사를 한다음 값을 넣음