import { Search, MapPin } from "lucide-react";
import type { Coe } from "../types";

interface SidebarProps {
  coes: Coe[];
  filtered: Coe[];
  selectedId: string | null;
  query: string;
  onQueryChange: (query: string) => void;
  stateFilter: string;
  onStateFilterChange: (state: string) => void;
  onSelect: (id: string) => void;
}

export default function Sidebar({
  coes,
  filtered,
  selectedId,
  query,
  onQueryChange,
  stateFilter,
  onStateFilterChange,
  onSelect,
}: SidebarProps) {
  const states = Array.from(new Set(coes.map((c) => c.state))).sort();

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="border-b border-slate-200 p-4">
        <h1 className="text-lg font-semibold text-slate-900">Rare Disease CoEs</h1>
        <p className="text-sm text-slate-500">
          {filtered.length} of {coes.length} Centers of Excellence, India
        </p>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, city, or state"
            className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <select
          value={stateFilter}
          onChange={(e) => onStateFilterChange(e.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 py-2 px-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          <option value="">All states</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="p-4 text-sm text-slate-500">No centers match your search.</p>
        )}
        <ul>
          {filtered.map((coe) => (
            <li key={coe.id}>
              <button
                type="button"
                onClick={() => onSelect(coe.id)}
                className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-brand-50 ${coe.id === selectedId ? "bg-brand-50" : ""
                  }`}
              >
                <MapPin
                  className={`mt-0.5 h-4 w-4 shrink-0 ${coe.id === selectedId ? "text-brand-600" : "text-slate-400"
                    }`}
                />
                <span>
                  <span className="block text-sm font-medium text-slate-900">{coe.name}</span>
                  <span className="block text-xs text-slate-500">
                    {coe.city}, {coe.state}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
