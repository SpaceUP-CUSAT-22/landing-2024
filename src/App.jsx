import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import BuyMerch from './pages/BuyMerch'
import BuyTicket from './pages/BuyTicket'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/buymerch" element={<BuyMerch />} />
          {/* <Route path="/buyticket" element={<BuyTicket />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
