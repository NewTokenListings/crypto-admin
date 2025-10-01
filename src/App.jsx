import React from "react";
import { Routes, Route } from "react-router-dom";

// Context & Components
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Pages
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import AuthDebug from "./pages/admin/AuthDebug.jsx";
import CategoriesPage from "./pages/admin/Categories.jsx"; // ✅ new

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public homepage */}
        <Route path="/" element={<div className="p-8 text-center">🚀 Coming soon...</div>} />

        {/* Admin login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Debug auth session */}
        <Route path="/admin/debug" element={<AuthDebug />} />

        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* ✅ New Categories tab */}
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<div className="p-8 text-center">404 - Page not found</div>}
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
