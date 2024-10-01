import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"

function App() {
  React.useEffect(() => {
    
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
