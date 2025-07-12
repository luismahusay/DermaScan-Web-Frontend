// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import AdminPage from './admin/admin_login';
import DermaPage from './dermatologist/derma_login';
import AdminDashboard from './admin/admin_dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dermatologist" element={<DermaPage/>} />
        <Route path="/admin/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;