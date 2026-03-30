"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapMarker {
  coordinates: [number, number];
  title: string;
  slug: string;
}

interface TravelMapProps {
  markers: MapMarker[];
}

export default function TravelMap({ markers }: TravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
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
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-tiles-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [10, 30],
      zoom: 1.5,
      attributionControl: {},
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "travel-marker";
      el.style.cssText =
        "width: 14px; height: 14px; background: #007BA7; border: 2px solid white; border-radius: 50%; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.3);";

      const popup = new maplibregl.Popup({
        offset: 12,
        closeButton: false,
        className: "travel-popup",
      }).setHTML(
        `<a href="/travels/${marker.slug}" style="text-decoration:none;color:#1a1a1a;font-weight:500;font-size:14px;">${marker.title}</a>`
      );

      new maplibregl.Marker({ element: el })
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [markers]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden border border-border"
    />
  );
}
