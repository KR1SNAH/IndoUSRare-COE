import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { Coe } from "../types";

interface MarkerPinProps {
  coe: Coe;
  selected: boolean;
  onClick: (id: string) => void;
}

export default function MarkerPin({ coe, selected, onClick }: MarkerPinProps) {
  return (
    <AdvancedMarker
      position={{ lat: coe.lat, lng: coe.lng }}
      title={coe.name}
      onClick={() => onClick(coe.id)}
    >
      <Pin
        background={selected ? "#3466f6" : "#1b39b3"}
        borderColor={selected ? "#1a2e70" : "#0f1d4d"}
        glyphColor={selected ? "#eef4ff" : "#d9e6ff"}
        scale={selected ? 1.25 : 1}
      />
    </AdvancedMarker>
  );
}
