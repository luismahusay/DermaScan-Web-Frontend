// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RegistrationProvider } from "./contexts/RegistrationContext";
import { ProductProvider } from "./contexts/ProductContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import your existing components
import LandingPage from "./pages/landingpage";
import AdminPage from "./admin/admin_login";
import ProductManagement from "./admin/admin_product_management";
import DermaLogin from "./dermatologist/derma_login";
import DermaDashboard from "./dermatologist/dashboard";
import DermaRegister from "./dermatologist/register";
import DermaVerification from "./dermatologist/verification";
import SecurityRegister from "./dermatologist/security";
import EmailVerification from "./dermatologist/emailverification";
import ForgotPassword from "./dermatologist/forgotpassword";
import AdminDashboard from "./admin/admin_dashboard";
import DermaProductManagement from "./dermatologist/productmanagement";
import DermaBookings from "./dermatologist/bookings";
import DermaPatients from "./dermatologist/acceptedpatients";
import DermaSubscription from "./dermatologist/subscription";
import DermaProfile from "./dermatologist/profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RegistrationProvider>
          <ProductProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminPage />} />

              {/* Dermatologist Authentication Routes */}
              <Route
                path="/dermatologist/derma_login"
                element={<DermaLogin />}
              />
              <Route
                path="/dermatologist/register"
                element={<DermaRegister />}
              />
              <Route
                path="/dermatologist/verification"
                element={<DermaVerification />}
              />
              <Route
                path="/dermatologist/security"
                element={<SecurityRegister />}
              />
              <Route
                path="/dermatologist/emailverification"
                element={<EmailVerification />}
              />
              <Route
                path="/dermatologist/forgotpassword"
                element={<ForgotPassword />}
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/admin_dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/admin_product_management"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ProductManagement />
                  </ProtectedRoute>
                }
              />

              {/* Dermatologist Protected Routes */}
              <Route
                path="/dermatologist/dashboard"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dermatologist/productmanagement"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dermatologist/bookings"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dermatologist/acceptedpatients"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaPatients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dermatologist/subscription"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaSubscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dermatologist/profile"
                element={
                  <ProtectedRoute requiredRole="dermatologist">
                    <DermaProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ProductProvider>
        </RegistrationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
