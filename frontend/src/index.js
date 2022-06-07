//index.js  is the main entry point for our app.
//In index.js, we render the App React element into the root DOM node.

import React from 'react';// React is the library for creating views.
import ReactDOM from 'react-dom/client';// ReactDOM is the library used to render the UI in the browser
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
