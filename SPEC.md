# Spec: Leaflet Clickable Polyline — Demo App

## Objective

Build a Next.js + TypeScript demo application that illustrates the "transparent hit-area overlay" technique for improving Leaflet polyline click/tap accuracy on mobile and desktop.

**User story:** A developer reading the accompanying article opens the demo, tries tapping the narrow polyline (and struggles), then toggles "With Fix" and immediately notices how much easier it is to tap — they understand the value of the technique.

**Success criteria:**
- A Leaflet map renders with a sample multi-segment route
- A toggle button switches between "Without Fix" (thin polyline only, `weight: 4`) and "With Fix" (thin + wide semi-transparent overlay, `weight: 20, opacity: 0.1`)
- Clicking/tapping any polyline shows visible feedback (e.g. a toast or counter: "Route clicked!")
- The app is deployed as a static site to GitHub Pages at `leaflet-polyline.curtiscode.dev`
- No runtime errors on mobile Safari or Chrome

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), static export |
| Language | TypeScript (strict) |
| Map library | Leaflet + react-leaflet v4 |
| Styling | Tailwind CSS v4 |
| Deployment | GitHub Pages via GitHub Actions |
| Node | 20 LTS |

---

## Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Type-check
npm run typecheck    # tsc --noEmit

# Lint
npm run lint         # next lint

# Production build (static export → /out)
npm run build

# Preview static output locally
npx serve out
```

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, metadata, Tailwind globals
    page.tsx            # Home page — renders the demo
  components/
    Map.tsx             # react-leaflet map (dynamic import, ssr: false)
    PolylineDemo.tsx    # Renders thin + optional overlay polylines
    ToggleButton.tsx    # "Without Fix" / "With Fix" toggle
    ClickFeedback.tsx   # Toast/counter shown on polyline click
  lib/
    sampleRoute.ts      # Generated lat/lng coordinate array for demo route
public/
  CNAME                 # leaflet-polyline.curtiscode.dev
next.config.ts          # output: 'export', images.unoptimized: true
```

---

## Code Style

```typescript
// PolylineDemo.tsx — the core pattern from the article
const ROUTE_COLOR = '#3b82f6';

<Polyline
  pathOptions={{ color: ROUTE_COLOR, weight: 20, opacity: 0.1 }}
  positions={coords}
  eventHandlers={{ click: onRouteClick }}
/>
<Polyline
  pathOptions={{ color: ROUTE_COLOR, weight: 4 }}
  positions={coords}
  eventHandlers={{ click: onRouteClick }}
/>
```

Conventions:
- Named exports everywhere (no default exports except Next.js pages/layouts)
- `interface` for props, `type` for unions/aliases
- No `any` — use `unknown` and narrow, or proper Leaflet types
- Tailwind classes in JSX, no CSS modules
- `const` arrow functions for components: `const Map = () => { ... }`

---

## Testing Strategy

This is a demo/article app — no automated tests required. Manual verification checklist:

- [ ] Map renders without errors on `npm run dev`
- [ ] Toggle switches between modes correctly
- [ ] Clicking the thin polyline in "Without Fix" mode often misses on mobile emulation
- [ ] Clicking anywhere near the polyline in "With Fix" mode reliably fires the event
- [ ] `npm run build` produces `/out` with no errors
- [ ] Site loads correctly from the static `/out` directory
- [ ] No console errors on Chrome DevTools mobile emulation (iPhone 12 profile)

---

## Leaflet + Next.js Notes

Leaflet accesses `window` at import time — it cannot be server-rendered.

```typescript
// In page.tsx or any server component:
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
```

Leaflet's CSS must be imported once, inside the client component:
```typescript
import 'leaflet/dist/leaflet.css';
```

Default marker icons break in bundlers — use `L.Icon.Default.mergeOptions(...)` or avoid markers entirely (this demo uses no markers).

---

## Boundaries

**Always do:**
- Import the Map component with `ssr: false`
- Run `npm run build` before marking any task done (static export catches issues dev server misses)
- Keep `public/CNAME` in the repo so GitHub Pages doesn't lose the custom domain on redeploy

**Ask first:**
- Changing the tile provider (default: OpenStreetMap)
- Adding any server-side routes or API routes (breaks static export)
- Adding new npm dependencies

**Never do:**
- Use `getServerSideProps` or any server-only Next.js features (incompatible with `output: 'export'`)
- Import Leaflet at the top level of a server component
- Commit `.next/` or `out/` directories

---

## Success Criteria

1. `npm run build` exits 0 with a populated `out/` directory
2. The map renders a visible route on first load with no console errors
3. Toggle button switches the polyline mode and the change is visible
4. A click/tap anywhere on or near the route in "With Fix" mode shows feedback
5. Deployed to GitHub Pages and accessible at the custom domain
6. The article's two-`<Polyline>` pattern (thin visible + wide semi-transparent overlay) is represented in the source

---

## Open Questions

- None — requirements confirmed.
