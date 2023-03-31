import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Components/LayoutArea/Layout/Layout'
import Test from './Components/test'
import PageNotFound from './Components/HomeArea/PageNotFound/PageNotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Layout /> */}
        {/* <Test/> */}
        <PageNotFound/>
      </BrowserRouter>
    </div>
  )
}

export default App
