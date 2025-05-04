import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Chatbot from './pages/chatbot/chatboat.jsx'
import Cut from './pages/dashboard/cut.jsx'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/cut" element={<Cut />} />
          {/* Add more routes as needed */}

        </Routes>
      </Router>
    </>
  )
}
export default App
