import './index.css';

import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

