import { Routes, Route } from "react-router-dom";
import Categories from "./pages/admin/Categories.jsx";
import Login from "./pages/admin/Login.jsx";
import AuthDebug from "./pages/admin/AuthDebug.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/debug"
        element={
          <ProtectedRoute>
            <AuthDebug />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<div>🚀 Coming soon...</div>} />
    </Routes>
  );
}

export default App;
