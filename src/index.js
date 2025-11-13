import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoLTeam from './LoLTeam';
import Header from './Header';
import reportWebVitals from './reportWebVitals';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' 또는 'lol'

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <App />}
      {currentPage === 'lol' && <LoLTeam />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
