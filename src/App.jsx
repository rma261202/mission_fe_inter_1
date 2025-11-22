import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register'; 
import HomePage from './pages/Home';         

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Utama: Kalau buka website, langsung ke Login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route Halaman Lain */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;