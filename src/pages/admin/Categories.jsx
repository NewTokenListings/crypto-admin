import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    console.log("📄 Rendering Categories.jsx");

    // Debug logs for env vars
    console.log("🔑 Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log(
      "🔑 Supabase Key present?:",
      !!import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    const loadCategories = async () => {
      try {
        console.log("📡 Fetching categories from Supabase...");

        const { data, error } = await supabase
          .from("tokens_public")
          .select("category")
          .not("category", "is", null)
          .neq("category", "");

        if (error) {
          console.error("❌ Supabase query error:", error);
          setError(error.message);
        } else {
          console.log("✅ Supabase query success:", data);
          const uniqueCategories = [
            ...new Set(data.map((row) => row.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("💥 Exception loading categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const { error } = await supabase
        .from("tokens_public")
        .insert([{ category: newCategory }]);
      if (error) throw error;
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } catch (err) {
      console.error("❌ Failed to add category:", err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {error && <div className="text-red-500">Error: {error}</div>}
      <p>Found {categories.length} categories.</p>

      <ul className="mb-4">
        {categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="px-2 py-1 text-black"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 px-4 py-1 rounded"
        >
          + Add Category
        </button>
      </div>
    </div>
  );
}
