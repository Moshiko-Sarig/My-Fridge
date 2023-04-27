import { BrowserRouter } from 'react-router-dom'
import { checkToken } from './Services/authService';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from './Components/LayoutArea/Layout/Layout'
import './App.css'



function App() {


  //* add chaking to the token
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  )
}

export default App;
