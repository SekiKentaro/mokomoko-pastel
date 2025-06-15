import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // グローバルスタイルを適用

// React 18 の推奨マウントメソッド
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
