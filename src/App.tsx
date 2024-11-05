import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Recommendations from './pages/Recommendations';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import BlackFriday from './pages/BlackFriday';
import ChristmasSale from './pages/ChristmasSale';

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

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/black-friday" element={<BlackFriday />} />
              <Route path="/christmas-sale" element={<ChristmasSale />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
  );
};

export default App;