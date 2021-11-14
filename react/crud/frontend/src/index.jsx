import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './styles/theme.css';

const toRender = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(toRender, document.getElementById('root'));