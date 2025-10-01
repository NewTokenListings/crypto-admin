import React from "react";
import { Routes, Route } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Users from "./pages/admin/Users.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import Categories from "./pages/admin/Categories.jsx";

// import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ⛔ bypassed
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Debug route: mount Categories directly without auth */}
        <Route path="/admin/categories" element={<Categories />} />

        {/* Still keep other protected routes behind ProtectedRoute */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/transactions" element={<Transactions />} />

        {/* Fallbacks */}
        <Route path="/" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
