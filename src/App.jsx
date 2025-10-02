import React from "react";
import { Routes, Route } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import Categories from "./pages/admin/Categories.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Auth routes */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected routes */}
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
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* Public + fallback */}
        <Route path="/" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
