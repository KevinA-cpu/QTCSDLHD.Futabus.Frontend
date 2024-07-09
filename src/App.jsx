import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Validate from './components/validation';
import TicketInfo from './components/TicketInfo';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Validate />} />
          <Route path="/info/:query_key" element={<TicketInfo />} />
        </Routes>
      </Router>
  )
}

export default App
