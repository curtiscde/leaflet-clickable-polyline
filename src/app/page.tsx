"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ToggleButton from "@/components/ToggleButton";
import ClickFeedback from "@/components/ClickFeedback";
import { routeBounds } from "@/lib/sampleRoute";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const PolylineDemo = dynamic(() => import("@/components/PolylineDemo"), {
  ssr: false,
});

export default function Home() {
  const [withFix, setWithFix] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleRouteClick = () => setClickCount((n) => n + 1);
  const handleToggle = () => {
    setWithFix((v) => !v);
    setClickCount(0);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex flex-col px-5 py-3 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-base font-semibold text-gray-900">
          Leaflet Clickable Polyline Regions Example
        </h1>
        <a
          href="https://www.curtiscode.dev/post/making-leaflet-polylines-easier-to-click-on-mobile"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          📝 Making Leaflet polylines easier to click on mobile - curtiscode.dev
        </a>
      </header>

      <div className="relative flex-1">
        <Map bounds={routeBounds}>
          <PolylineDemo withFix={withFix} onRouteClick={handleRouteClick} />
        </Map>
        <ToggleButton withFix={withFix} onToggle={handleToggle} />
        <ClickFeedback count={clickCount} />
      </div>
    </div>
  );
}
