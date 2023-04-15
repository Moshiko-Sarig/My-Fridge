import { BrowserRouter } from 'react-router-dom'
import { useCookie } from './hooks/useCookie';
import { checkToken } from './Services/authService';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from './Components/LayoutArea/Layout/Layout'
import './App.css'


function App() {

  const [authToken] = useCookie('authToken');
  const dispatch = useDispatch();
  useEffect(() => {
    if (authToken) {
      checkToken(authToken, dispatch);
    }
  }, [authToken, dispatch]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  )
}

export default App;
