"use client";

import { Polyline } from "react-leaflet";
import { sampleRoute } from "@/lib/sampleRoute";

const ROUTE_COLOR = "#3b82f6";

interface PolylineDemoProps {
  withFix: boolean;
  onRouteClick: () => void;
}

const PolylineDemo = ({ withFix, onRouteClick }: PolylineDemoProps) => {
  const handlers = { click: onRouteClick };

  return (
    <>
      {withFix && (
        <Polyline
          pathOptions={{ color: ROUTE_COLOR, weight: 20, opacity: 0.1 }}
          positions={sampleRoute}
          eventHandlers={handlers}
        />
      )}
      <Polyline
        pathOptions={{ color: ROUTE_COLOR, weight: 4 }}
        positions={sampleRoute}
        eventHandlers={handlers}
      />
    </>
  );
};

export default PolylineDemo;
