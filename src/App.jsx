import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import BuyMerch from './pages/BuyMerch'
import BuyTicket from './pages/BuyTicket'
import Connect from './pages/Connect'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/buymerch" element={<BuyMerch />} /> */}
          <Route path="/secretroute" element={<BuyTicket />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
