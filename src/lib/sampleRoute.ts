import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";

// Victoria Embankment section from the London Marathon route
// Blackfriars Bridge (east) → Waterloo Bridge (west)
export const sampleRoute: LatLngTuple[] = [
  [51.51097, -0.103],
  [51.51099, -0.10434],
  [51.51101, -0.10569],
  [51.51103, -0.10703],
  [51.51105, -0.10838],
  [51.51106, -0.10955],
  [51.51107, -0.11073],
  [51.51104, -0.11203],
  [51.51098, -0.11275],
  [51.51091, -0.11346],
  [51.51079, -0.11428],
  [51.51066, -0.1151],
  [51.51056, -0.11554],
  [51.51029, -0.11686],
  [51.50999, -0.11787],
  [51.50962, -0.119],
  [51.50911, -0.11987],
];

const lats = sampleRoute.map(([lat]) => lat);
const lons = sampleRoute.map(([, lon]) => lon);

export const routeBounds: LatLngBoundsExpression = [
  [Math.min(...lats), Math.min(...lons)],
  [Math.max(...lats), Math.max(...lons)],
];
