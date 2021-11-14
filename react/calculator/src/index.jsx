import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './index.css';

const componentsToRender = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const targetElement = document.getElementById('root')

ReactDOM.render(componentsToRender, targetElement);

serviceWorker.unregister();
