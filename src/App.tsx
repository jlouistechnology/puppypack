import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Recommendations from './pages/Recommendations';
import GetStarted from './pages/GetStarted';
import GetLifetimeAccess from './pages/GetLifetimeAccess';

// Protected Route component that checks for authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

// Payment Protected Route component that checks for both auth and payment
const PaymentProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const hasValidPayment = sessionStorage.getItem('stripe_success') === 'true';
  
  if (!user) return <Navigate to="/login" />;
  if (!hasValidPayment) return <Navigate to="/" />;
  
  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/onboarding" /> : <Signup />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/get-lifetime-access" element={<GetLifetimeAccess />} />
        <Route 
          path="/onboarding" 
          element={
            <PaymentProtectedRoute>
              <Onboarding />
            </PaymentProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recommendations" 
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;