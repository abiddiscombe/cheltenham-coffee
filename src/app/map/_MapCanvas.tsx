"use client";
import { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "@vis.gl/react-maplibre";
import { getBasemapConfig } from "@/utilities/ngdBase";
import { type Location } from "@/utilities/types/location";
import Pin from "./_Pin";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import {
  NUQS_KEYS,
  TAG_HAS_WIFI,
  TAG_PERMITS_DOGS,
  TAG_IS_INDEPENDENT,
  TAG_PERMITS_LAPTOPS,
} from "@/utilities/constants";

export default function MapCanvas() {
  const [filters] = useQueryState(
    NUQS_KEYS.FILTERS,
    parseAsArrayOf(parseAsString),
  );

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

  function filterLocationVisibility(location: Location) {
    if (!filters?.length) {
      return true;
    }

    if (
      filters.includes(TAG_IS_INDEPENDENT) &&
      !location.tags.includes(TAG_IS_INDEPENDENT)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_HAS_WIFI) &&
      !location.tags.includes(TAG_HAS_WIFI)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_PERMITS_DOGS) &&
      !location.tags.includes(TAG_PERMITS_DOGS)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_PERMITS_LAPTOPS) &&
      !location.tags.includes(TAG_PERMITS_LAPTOPS)
    ) {
      return false;
    }

    return true;
  }

  useEffect(() => {
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
      {locations.filter(filterLocationVisibility).map((location) => (
        <Pin key={location.id} {...location} />
      ))}
    </Map>
  );
}
