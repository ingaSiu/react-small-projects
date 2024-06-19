import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import App from './App.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterScreen from './screens/RegisterScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

