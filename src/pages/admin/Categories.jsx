import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [expandedToken, setExpandedToken] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  // Fetch categories (distinct values from tokens table)
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("tokens").select("category");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        const uniqueCategories = [...new Set(data.map((row) => row.category))];
        setCategories(uniqueCategories.filter((c) => c)); // remove null/empty
      }
    };

    fetchCategories();
  }, []);

  // Fetch tokens for a selected category
  const fetchTokens = async (category) => {
    setSelectedCategory(category);
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .eq("category", category);

    if (error) {
      console.error("Error fetching tokens:", error);
    } else {
      setTokens(data);
    }
  };

  // Create a new category
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    const { error } = await supabase.from("tokens").insert([
      {
        name: `placeholder-${Date.now()}`,
        category: newCategory.trim(),
      },
    ]);

    if (error) {
      console.error("Error creating category:", error);
    } else {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* New Category Input */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* Category List */}
      <div className="flex gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => fetchTokens(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Token List */}
      {selectedCategory && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Tokens in "{selectedCategory}"
          </h2>

          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <React.Fragment key={token.id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      setExpandedToken(
                        expandedToken === token.id ? null : token.id
                      )
                    }
                  >
                    <td className="border p-2">{token.name}</td>
                  </tr>

                  {/* Expanded details */}
                  {expandedToken === token.id && (
                    <tr>
                      <td className="border p-4 bg-gray-50" colSpan={1}>
                        <h3 className="font-semibold">Details</h3>
                        <div className="mt-2">
                          {/* All fields nicely listed */}
                          {Object.entries(token).map(([key, value]) => (
                            <p key={key}>
                              <strong>{key}:</strong> {String(value)}
                            </p>
                          ))}
                        </div>

                        {/* Raw JSON */}
                        <details className="mt-4">
                          <summary className="cursor-pointer text-blue-600">
                            Show raw JSON
                          </summary>
                          <pre className="text-sm bg-black text-green-400 p-2 rounded mt-2 overflow-x-auto">
                            {JSON.stringify(token, null, 2)}
                          </pre>
                        </details>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Categories;
