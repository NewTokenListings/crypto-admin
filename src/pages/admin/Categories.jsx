import React from "react";
import { supabase } from "../../supabaseClient";

function CategoriesSidebar({ categories, onSelect }) {
  return (
    <div className="w-64 bg-gray-900 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onSelect(cat.name)}
              className="w-full text-left px-2 py-1 rounded hover:bg-gray-700"
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-green-600 px-3 py-1 rounded"
        onClick={() => {
          const newName = prompt("Enter new category name:");
          if (newName) {
            supabase.from("categories").insert({ name: newName }).then(() => {
              window.location.reload(); // quick refresh after insert
            });
          }
        }}
      >
        + Add Category
      </button>
    </div>
  );
}

function TokensTable({ tokens }) {
  const [expanded, setExpanded] = React.useState(null);

  return (
    <div className="p-4 flex-1 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Tokens</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <React.Fragment key={token.id}>
              <tr
                onClick={() =>
                  setExpanded(expanded === token.id ? null : token.id)
                }
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="p-2">{token.name}</td>
              </tr>
              {expanded === token.id && (
                <tr>
                  <td colSpan="1" className="p-4 bg-gray-50">
                    {/* Styled token details */}
                    <div className="mb-2">
                      {token.logo_url && (
                        <img
                          src={token.logo_url}
                          alt=""
                          className="w-12 h-12 mb-2"
                        />
                      )}
                      <h3 className="font-bold">
                        {token.name} ({token.symbol})
                      </h3>
                      <p>Price: ${token.price_usd}</p>
                      <p>Market Cap: ${token.market_cap}</p>
                      <p>Category: {token.category}</p>
                      {token.website && (
                        <a
                          href={token.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Website
                        </a>
                      )}
                    </div>

                    {/* Raw JSON toggle */}
                    <details>
                      <summary className="cursor-pointer text-blue-600">
                        Show raw JSON
                      </summary>
                      <pre className="bg-black text-green-400 p-2 text-sm overflow-x-auto">
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
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState([]);
  const [tokens, setTokens] = React.useState([]);
  const [selectedCat, setSelectedCat] = React.useState(null);

  React.useEffect(() => {
    // Fetch categories
    supabase.from("categories").select("*").then(({ data }) => setCategories(data || []));
  }, []);

  React.useEffect(() => {
    if (selectedCat) {
      supabase
        .from("tokens")
        .select("*")
        .eq("category", selectedCat)
        .then(({ data }) => setTokens(data || []));
    }
  }, [selectedCat]);

  return (
    <div className="flex h-screen">
      <CategoriesSidebar categories={categories} onSelect={setSelectedCat} />
      <TokensTable tokens={tokens} />
    </div>
  );
}
