import React, { useEffect, useMemo, useState } from "react";
import { supabase, logSupabaseBoot } from "../../supabaseClient";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [tokens, setTokens] = useState([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [tokensError, setTokensError] = useState(null);

  const [expandedTokenId, setExpandedTokenId] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  // Initial log for env + session
  useEffect(() => {
    logSupabaseBoot("Categories:boot");

    supabase.auth.getSession().then(({ data }) => {
      console.log("🔑 Supabase session", data.session);
    });
  }, []);

  // Fetch distinct categories from tokens_public
  useEffect(() => {
    let isMounted = true;

    (async () => {
      setLoading(true);
      setLoadError(null);
      console.log("📥 Fetching categories…");

      const { data, error } = await supabase
        .from("tokens_public")
        .select("category");

      console.log("🧪 categories query ->", { error, rows: data?.length, sample: data?.[0] });

      if (!isMounted) return;

      if (error) {
        console.error("❌ Error fetching categories", error);
        setLoadError(error.message ?? "Unknown error");
        setCategories([]);
      } else {
        const uniq = [
          ...new Set(
            (data ?? [])
              .map(r => {
                if (!r.category || !r.category.trim()) return "Uncategorized";
                return r.category.trim();
              })
          ),
        ].sort((a, b) => a.localeCompare(b));
        setCategories(uniq);
        if (!uniq.length) {
          console.warn("ℹ️ No categories found in tokens_public.category.");
        }
      }
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasCategories = useMemo(() => categories.length > 0, [categories]);

  async function fetchTokensFor(category) {
    setSelectedCategory(category);
    setTokens([]);
    setTokensError(null);
    setTokensLoading(true);

    console.log("📥 Fetching tokens for category:", category);

    const { data, error } = await supabase
      .from("tokens_public")
      .select("*")
      .order("name", { ascending: true });

    console.log("🧪 tokens query ->", { category, error, rows: data?.length, sample: data?.[0] });

    if (error) {
      console.error("❌ Error fetching tokens", error);
      setTokensError(error.message ?? "Unknown error");
      setTokens([]);
    } else {
      // filter client-side to group Uncategorized
      const filtered = (data ?? []).filter(t => {
        const cat = t.category && t.category.trim() ? t.category.trim() : "Uncategorized";
        return cat === category;
      });
      setTokens(filtered);
    }
    setTokensLoading(false);
  }

  async function handleCreateCategory() {
    const label = newCategory.trim() || "Uncategorized";

    console.log("➕ Creating placeholder category:", label);

    const { data, error } = await supabase.from("tokens_public").insert([
      {
        name: `placeholder-${Date.now()}`,
        category: label,
      },
    ]).select();

    console.log("🧪 insert result ->", { error, inserted: data });

    if (error) {
      alert(`Error creating category: ${error.message}`);
      return;
    }

    if (!categories.includes(label)) {
      setCategories(prev => [...prev, label].sort((a, b) => a.localeCompare(b)));
    }
    setNewCategory("");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="text-sm text-gray-600 mb-4">
        {loading
          ? "Loading categories…"
          : `Found ${categories.length} categor${categories.length === 1 ? "y" : "ies"}.`}
        {loadError && <span className="text-red-600 ml-2">Error: {loadError}</span>}
      </div>

      <div className="flex items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {!loading && !hasCategories && !loadError && (
        <div className="rounded border border-dashed p-6 text-gray-600">
          No categories found. Approve tokens into <code>tokens_public</code> with categories, 
          or use “+ Add Category” to create a placeholder row.
        </div>
      )}

      {loadError && (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-700 mb-6">
          Failed to load categories. Check console for details.
        </div>
      )}

      {hasCategories && (
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => fetchTokensFor(cat)}
              className={`px-3 py-1.5 rounded-full border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
              title={cat}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div className="mt-4">
          <div className="mb-3 text-sm text-gray-700">
            {tokensLoading
              ? `Loading tokens for “${selectedCategory}”…`
              : `Showing ${tokens.length} token${tokens.length === 1 ? "" : "s"} in “${selectedCategory}”.`}
            {tokensError && <span className="text-red-600 ml-2">Error: {tokensError}</span>}
          </div>

          {!tokensLoading && !tokens.length && !tokensError && (
            <div className="rounded border border-dashed p-4 text-gray-600">
              No tokens found in this category yet.
            </div>
          )}

          {!!tokens.length && (
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 w-10">#</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-left p-2">CMC ID</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((t, i) => {
                    const tokenId = t.id ?? `${t.name}-${i}`;
                    const isOpen = expandedTokenId === tokenId;
                    return (
                      <React.Fragment key={tokenId}>
                        <tr
                          className="border-t hover:bg-gray-50 cursor-pointer"
                          onClick={() => setExpandedTokenId(isOpen ? null : tokenId)}
                        >
                          <td className="p-2">{i + 1}</td>
                          <td className="p-2 font-medium">{t.name ?? "—"}</td>
                          <td className="p-2">{t.symbol ?? "—"}</td>
                          <td className="p-2">{t.cmc_id ?? t.id ?? "—"}</td>
                          <td className="p-2">
                            {t.category && t.category.trim() ? t.category : "Uncategorized"}
                          </td>
                          <td className="p-2">
                            {t.updated_at ? new Date(t.updated_at).toLocaleString() : "—"}
                          </td>
                        </tr>
                        {isOpen && (
                          <tr className="bg-gray-50">
                            <td colSpan={6} className="p-3">
                              <pre className="text-xs bg-white border rounded p-3 overflow-auto">
{JSON.stringify(t, null, 2)}
                              </pre>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
