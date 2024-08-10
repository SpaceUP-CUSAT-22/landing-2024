import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import Register from "./pages/Register"
import Main2 from "./pages/Main2"
import gsap from 'gsap'
import BuyTshirt from './pages/BuyTshirt'
import BulkRegister from './pages/BulkRegister'

function App() {
  React.useEffect(() => {
    
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bulkregister" element={<BulkRegister />} />
          <Route path="/buymerch" element={<BuyTshirt />} />
          <Route path="/buytshirt" element={<BuyTshirt />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
