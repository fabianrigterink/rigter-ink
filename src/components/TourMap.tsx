"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Stop {
  code: string;
  city: string;
  lng: number;
  lat: number;
  note?: string;
}

// Ordered visit sequences for the two optimal tours. Each tour is a closed loop:
// the last leg returns to the first stop (home, SFO). Coordinates are city centers.
const TOURS: Record<string, { stops: Stop[] }> = {
  top10: {
    stops: [
      { code: "SFO", city: "San Francisco", lng: -122.41942, lat: 37.77493, note: "Home — start & end" },
      { code: "LON", city: "London", lng: -0.12574, lat: 51.50853 },
      { code: "AYT", city: "Antalya", lng: 30.69556, lat: 36.90812 },
      { code: "IST", city: "Istanbul", lng: 28.94966, lat: 41.01384 },
      { code: "PAR", city: "Paris", lng: 2.3488, lat: 48.85341 },
      { code: "DXB", city: "Dubai", lng: 55.30927, lat: 25.07725 },
      { code: "JED", city: "Jeddah", lng: 39.18624, lat: 21.49012, note: "Mecca" },
      { code: "KUL", city: "Kuala Lumpur", lng: 101.68653, lat: 3.1412 },
      { code: "MFM", city: "Macau", lng: 113.54611, lat: 22.20056 },
      { code: "BKK", city: "Bangkok", lng: 100.50144, lat: 13.75398 },
      { code: "HKG", city: "Hong Kong", lng: 114.17469, lat: 22.27832 },
    ],
  },
  wonders: {
    stops: [
      { code: "SFO", city: "San Francisco", lng: -122.41942, lat: 37.77493, note: "Home — start & end" },
      { code: "CUN", city: "Cancún", lng: -86.84656, lat: 21.17429, note: "Chichén Itzá" },
      { code: "AMM", city: "Amman", lng: 35.94503, lat: 31.95522, note: "Petra" },
      { code: "CAI", city: "Cairo", lng: 31.24967, lat: 30.06263, note: "Giza" },
      { code: "DEL", city: "Delhi", lng: 77.23149, lat: 28.65195, note: "Taj Mahal" },
      { code: "BJS", city: "Beijing", lng: 116.39723, lat: 39.9075, note: "Great Wall" },
      { code: "ROM", city: "Rome", lng: 12.51133, lat: 41.89193, note: "Colosseum" },
      { code: "LIM", city: "Lima", lng: -77.02824, lat: -12.04318, note: "Machu Picchu" },
      { code: "RIO", city: "Rio de Janeiro", lng: -43.18223, lat: -22.90642, note: "Christ the Redeemer" },
    ],
  },
};

const ARC_STEPS = 64;

// Web-Mercator northing — so arrow bearings come out right in screen space.
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));

// Pick the representation of b's longitude within ±180° of a, so arcs take the
// short way around the globe instead of wrapping the wrong direction.
function unwrapLng(aLng: number, bLng: number): number {
  let b = bLng;
  while (b - aLng > 180) b -= 360;
  while (b - aLng < -180) b += 360;
  return b;
}

// Quadratic Bézier with a control point offset perpendicular to the chord, giving
// every leg a consistent leftward bow (the classic arced flight-map look).
function arcPoints(a: Stop, b: Stop, bend = 0.18): [number, number][] {
  const ax = a.lng;
  const ay = a.lat;
  const bx = unwrapLng(a.lng, b.lng);
  const by = b.lat;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1e-6;
  const nx = -dy / len; // left-hand perpendicular
  const ny = dx / len;
  const cx = (ax + bx) / 2 + nx * bend * len;
  const cy = (ay + by) / 2 + ny * bend * len;

  const pts: [number, number][] = [];
  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS;
    const u = 1 - t;
    pts.push([
      u * u * ax + 2 * u * t * cx + t * t * bx,
      u * u * ay + 2 * u * t * cy + t * t * by,
    ]);
  }
  return pts;
}

interface TourMapProps {
  tour: "top10" | "wonders";
  caption?: string;
}

export default function TourMap({ tour, caption }: TourMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const stops = TOURS[tour]?.stops;
    if (!containerRef.current || mapRef.current || !stops) return;

    const css = getComputedStyle(document.documentElement);
    const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const lineColor = v("--color-link", "#2A6F7E");
    const inkColor = v("--color-ink", "#1a1a1a");
    const mutedColor = v("--color-ink-muted", "#767676");
    const haloColor = v("--color-background", "#ffffff");
    const homeColor = v("--color-magenta", "#FF3F86");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          { id: "osm-tiles-layer", type: "raster", source: "osm-tiles", minzoom: 0, maxzoom: 19 },
        ],
      },
      center: [10, 25],
      zoom: 0.8,
      attributionControl: {},
      dragRotate: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    // Build one curved LineString per leg, plus a direction arrow at each leg's midpoint.
    const n = stops.length;
    const features: GeoJSON.Feature[] = [];
    const arrows: { lng: number; lat: number; rot: number }[] = [];

    for (let i = 0; i < n; i++) {
      const a = stops[i];
      const b = stops[(i + 1) % n];
      const pts = arcPoints(a, b);
      features.push({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: pts } });

      const mid = pts[ARC_STEPS / 2];
      const p1 = pts[Math.round(ARC_STEPS * 0.46)];
      const p2 = pts[Math.round(ARC_STEPS * 0.54)];
      const rot = (Math.atan2(p2[0] - p1[0], mercY(p2[1]) - mercY(p1[1])) * 180) / Math.PI;
      arrows.push({ lng: mid[0], lat: mid[1], rot });
    }

    map.on("load", () => {
      map.addSource("routes", { type: "geojson", data: { type: "FeatureCollection", features } });
      map.addLayer({
        id: "routes-casing",
        type: "line",
        source: "routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": haloColor, "line-width": 4.5, "line-opacity": 0.9 },
      });
      map.addLayer({
        id: "routes-line",
        type: "line",
        source: "routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": lineColor, "line-width": 2 },
      });

      // Direction arrows (north-pointing SVG, rotated to each leg's heading).
      arrows.forEach(({ lng, lat, rot }) => {
        const el = document.createElement("div");
        el.style.cssText = "pointer-events:none;";
        el.innerHTML = `<svg width="15" height="15" viewBox="0 0 16 16"><path d="M8 1.5 L13 13.5 L8 10.5 L3 13.5 Z" fill="${lineColor}" stroke="${haloColor}" stroke-width="1"/></svg>`;
        new maplibregl.Marker({ element: el, rotation: rot, rotationAlignment: "map" })
          .setLngLat([lng, lat])
          .addTo(map);
      });

      // Numbered, clickable city nodes — click (or hover) reveals city + landmark.
      stops.forEach((s, i) => {
        const isHome = i === 0;
        const el = document.createElement("div");
        el.title = `${s.city} (${s.code})`;
        el.style.cssText =
          `display:flex;align-items:center;justify-content:center;width:24px;height:24px;` +
          `border-radius:50%;background:${isHome ? homeColor : lineColor};color:${haloColor};` +
          `font:600 11px/1 system-ui,sans-serif;border:2px solid ${haloColor};` +
          `box-shadow:0 1px 4px rgba(0,0,0,.35);cursor:pointer;`;
        el.textContent = String(i + 1);

        const noteLine = s.note
          ? `<div style="color:${mutedColor};font-size:12px;margin-top:3px;">${s.note}</div>`
          : "";
        const popup = new maplibregl.Popup({ offset: 14, closeButton: false, className: "travel-popup" }).setHTML(
          `<div style="color:${inkColor};font-weight:600;font-size:14px;">${i + 1}. ${s.city} (${s.code})</div>${noteLine}`
        );

        // Click (or tap) the node to toggle its popup — bound automatically by setPopup.
        new maplibregl.Marker({ element: el })
          .setLngLat([s.lng, s.lat])
          .setPopup(popup)
          .addTo(map);
      });

      const bounds = new maplibregl.LngLatBounds();
      stops.forEach((s) => bounds.extend([s.lng, s.lat]));
      map.fitBounds(bounds, { padding: 56, duration: 0, maxZoom: 4 });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [tour]);

  return (
    <span className="block my-8">
      <span
        ref={containerRef}
        className="block w-full h-110 sm:h-140 rounded-xl overflow-hidden border border-border"
      />
      {caption && (
        <span className="block mt-2 text-sm text-ink-muted text-center">{caption}</span>
      )}
    </span>
  );
}
