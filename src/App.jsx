import { useState, useDeferredValue, useMemo } from "react";
import TicTock from "./TicTock";
import { CreateUser } from "./UserDetails/create";
import { UserDetails } from "./UserDetails";
// import { EditUser } from "./UserDetails/edit";

// Mock data to search
const ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

// Simulates expensive filtering (useDeferredValue keeps input responsive)
function heavySearch(query) {
  console.log("query", query);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // Artificial slowdown to demonstrate deferred value benefit
  const start = performance.now();
  while (performance.now() - start < 10) {}
  return ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
}

function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    return heavySearch(deferredQuery);
  }, [deferredQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      {/* <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Deferred search
        </h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          useDeferredValue + useMemo — input stays responsive while results update
        </p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent mb-4"
        />
        <div className="bg-slate-800/80 rounded-lg border border-slate-600 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="p-4 text-slate-500 text-center">
              {deferredQuery !== query
                ? "Updating..."
                : query.trim()
                  ? "No results"
                  : "Type to search"}
            </p>
          ) : (
            <ul className="divide-y divide-slate-700">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 text-slate-200 hover:bg-slate-700/50"
                >
                  {item.name} — {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div> */}
      {/* <TicTock /> */}
      {/* <CreateUser /> */}
      {/* <EditUser /> */}
      <UserDetails />
    </div>
  )
}

export default App
