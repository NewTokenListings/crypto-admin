import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import Login from "./pages/admin/Login.jsx";
import AuthDebug from "./pages/admin/AuthDebug.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  console.log("App rendering...");

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-3xl">🚀 Coming Soon</h1>
              <p className="mt-4 text-gray-600">
                We are building New Token Listing website showcasing the newest tokens.
              </p>
              <a
                href="/admin/login"
                className="mt-6 text-blue-500 underline"
              >
                Admin Login
              </a>
            </div>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/debug" element={<AuthDebug />} />

        {/* Redirect /admin → /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

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

        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
