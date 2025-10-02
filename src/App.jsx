// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/admin/login.jsx";
import Categories from "./pages/admin/Categories.jsx";
import NotFound from "./pages/admin/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect root → login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/categories" element={<Categories />} />

        {/* catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
