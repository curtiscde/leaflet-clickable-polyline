"use client";

import "leaflet/dist/leaflet.css";
import type { LatLngBoundsExpression } from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function FitBounds({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

interface MapProps {
  bounds: LatLngBoundsExpression;
  children?: React.ReactNode;
}

const Map = ({ bounds, children }: MapProps) => {
  return (
    <MapContainer
      center={[51.5105, -0.111]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <FitBounds bounds={bounds} />
      {children}
    </MapContainer>
  );
};

export default Map;
