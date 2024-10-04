import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import BuyMerch from './pages/BuyMerch'
import Events from './events'
function App() {
  React.useEffect(() => {
    
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/buymerch" element={<BuyMerch />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
