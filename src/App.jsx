// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/Users";
import Transactions from "./pages/admin/Transactions";
import NotFound from "./pages/admin/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import AuthDebug from "./pages/admin/AuthDebug";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/auth-debug" element={<AuthDebug />} />

      {/* Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
