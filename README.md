# CoE Map

An interactive Google Maps view of India's rare-disease Centers of Excellence (COEs), built with React, TypeScript, and Vite.

## Features

- Full-screen Google Map centered on India with a pin per CoE
- Sidebar with free-text search (name/city/state) and a state filter
- Clicking a marker or a sidebar row pans/zooms the map and opens an animated detail panel (address, contacts, staff-directory link, notes)
- Responsive layout: fixed sidebar on desktop, toggleable drawer on mobile

## Tech stack

- React + TypeScript + Vite
- [`@vis.gl/react-google-maps`](https://visgl.github.io/react-google-maps/) for the map and markers
- Tailwind CSS for styling
- `framer-motion` for the info panel animation
- `lucide-react` for icons

## Data

[CoE.csv](CoE.csv) is the source data. It's hand-transcribed into [`src/data/coe.ts`](src/data/coe.ts) with researched latitude/longitude per institution, since the source has no coordinates of its own.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add a Google Maps API key (with the Maps JavaScript API enabled) to `.env.local`:

   ```
   VITE_GOOGLE_MAPS_API_KEY=your-key-here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Notes

- The map uses Google's public `DEMO_MAP_ID` (see `src/components/MapView.tsx`), which is fine for local development but should be swapped for your own Map ID (Google Cloud Console → Maps Platform → Map Management) before deploying.
