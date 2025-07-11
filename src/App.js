// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import AdminPage from './admin/admin_login';
import DermaPage from './dermatologist/derma_login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dermatologist" element={<DermaPage/>} />
      </Routes>
    </Router>
  );
}

export default App;