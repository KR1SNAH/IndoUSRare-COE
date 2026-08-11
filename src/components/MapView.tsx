import { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import type { Coe } from "../types";
import MarkerPin from "./MarkerPin";

const INDIA_CENTER = { lat: 22.5, lng: 80.5 };

interface MapViewProps {
  coes: Coe[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function FlyToSelected({ selected }: { selected: Coe | null }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selected) return;
    map.panTo({ lat: selected.lat, lng: selected.lng });
    if ((map.getZoom() ?? 0) < 9) map.setZoom(9);
  }, [map, selected]);

  return null;
}

export default function MapView({ coes, selectedId, onSelect }: MapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const selected = coes.find((c) => c.id === selectedId) ?? null;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-100 p-8 text-center text-slate-600">
        Missing <code className="mx-1 rounded bg-slate-200 px-1">VITE_GOOGLE_MAPS_API_KEY</code>
        — add it to a <code className="mx-1 rounded bg-slate-200 px-1">.env.local</code> file and
        restart the dev server.
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={INDIA_CENTER}
        defaultZoom={5}
        gestureHandling="greedy"
        disableDefaultUI={false}
        className="h-full w-full"
      >
        <FlyToSelected selected={selected} />
        {coes.map((coe) => (
          <MarkerPin
            key={coe.id}
            coe={coe}
            selected={coe.id === selectedId}
            onClick={onSelect}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
