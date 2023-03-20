import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRCode from 'react-qr-code'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"https://www.youtube.com/watch?v=njeaCPYuDIg&ab_channel=WornOffKeys"}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  )
}

export default App
