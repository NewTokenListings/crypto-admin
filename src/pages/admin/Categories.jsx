// src/pages/admin/Categories.jsx
import React from "react";

export default function Categories() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>📂 Categories Management</h1>
      <p>Here you will be able to manage token categories.</p>

      <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
        <li>🔥 Trending</li>
        <li>🆕 New Listings</li>
        <li>💎 Premium</li>
      </ul>
    </div>
  );
}
