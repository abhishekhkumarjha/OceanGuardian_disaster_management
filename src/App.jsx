import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Dashboard from './pages/Dashboard';
import ReportHazard from './pages/ReportHazard';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      {/* Public routes (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes (with layout) */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/report" 
        element={
          <ProtectedRoute>
            <Layout><ReportHazard /></Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/UserProfile" 
        element={
          <ProtectedRoute>
            <Layout><UserProfile /></Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;