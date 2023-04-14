import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const contentElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(contentElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
