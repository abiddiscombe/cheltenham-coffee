"use client";
import { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "@vis.gl/react-maplibre";
import { getBasemapConfig } from "@/utilities/ngdBase";
import { type Location } from "@/utilities/types/location";
import Pin from "./_Pin";

export default function MapCanvas() {
  const [locations, setLocations] = useState<Location[]>([]);

  async function getLocations() {
    const res = await fetch("/api/locations");

    if (res.status !== 200) {
      console.error("Failed to GET '/api/locations'");
      return;
    }

    const resJson = await res.json();
    setLocations(resJson.locations);
  }

  useEffect(() => {
    // Fetch location data from the backend.
    getLocations();
  }, []);

  return (
    <Map
      mapLib={maplibregl}
      mapStyle={getBasemapConfig()}
      minZoom={12}
      maxZoom={15}
      maxBounds={[-2.308159, 51.83705, -1.865959, 51.971346]}
      initialViewState={{ zoom: 12, latitude: 51.900091, longitude: -2.076931 }}
      style={{ gridRow: 1, gridColumn: 1, zIndex: 0 }}
    >
      {locations.map((location) => (
        <Pin
          id={location.id}
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
        />
      ))}
    </Map>
  );
}
