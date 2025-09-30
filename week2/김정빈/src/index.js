import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 리액트 앱을 HTML에 연결 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
//리액트 앱의 시작점 