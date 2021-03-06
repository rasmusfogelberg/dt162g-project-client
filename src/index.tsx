import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Entry point of the application.
 * 
 * ReactDOM renders, in strict mode, the App component (which is the main compone)
 * application.
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);