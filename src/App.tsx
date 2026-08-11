import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { coeData } from "./data/coe";
import { matchesQuery } from "./lib/coe-helpers";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import InfoPanel from "./components/InfoPanel";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(
    () =>
      coeData.filter(
        (coe) =>
          matchesQuery(coe, query) && (!stateFilter || coe.state === stateFilter),
      ),
    [query, stateFilter],
  );

  const selected = coeData.find((c) => c.id === selectedId) ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
    setDrawerOpen(false);
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      <aside className="hidden h-full w-80 shrink-0 border-r border-slate-200 md:block">
        <Sidebar
          coes={coeData}
          filtered={filtered}
          selectedId={selectedId}
          query={query}
          onQueryChange={setQuery}
          stateFilter={stateFilter}
          onStateFilterChange={setStateFilter}
          onSelect={handleSelect}
        />
      </aside>

      {drawerOpen && (
        <div className="absolute inset-0 z-20 flex md:hidden">
          <div className="h-full w-80 max-w-[85vw] shadow-xl">
            <Sidebar
              coes={coeData}
              filtered={filtered}
              selectedId={selectedId}
              query={query}
              onQueryChange={setQuery}
              stateFilter={stateFilter}
              onStateFilterChange={setStateFilter}
              onSelect={handleSelect}
            />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-slate-900/40"
          />
        </div>
      )}

      <main className="relative flex-1">
        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          className="absolute left-4 top-4 z-10 rounded-md bg-white p-2 shadow-md md:hidden"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <MapView coes={filtered} selectedId={selectedId} onSelect={handleSelect} />
        <InfoPanel coe={selected} onClose={() => setSelectedId(null)} />
      </main>
    </div>
  );
}
