import { configureStore } from '@reduxjs/toolkit';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import allReducers from './Components/Redux/Reducers';
import './index.css'
import axios from 'axios';

axios.defaults.withCredentials = true;

let store = configureStore({
  reducer: allReducers
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
)
