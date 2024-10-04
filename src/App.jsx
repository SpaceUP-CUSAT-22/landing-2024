import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import BuyMerch from './pages/BuyMerch'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/buymerch" element={<BuyMerch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
