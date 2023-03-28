import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRCode from 'react-qr-code'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Components/LayoutArea/Layout/Layout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  )
}

export default App
