"use client";
import { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map, NavigationControl } from "@vis.gl/react-maplibre";
import { getBasemapConfig } from "@/utilities/ngdBase";
import { type Location } from "@/utilities/types/location";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import {
  NUQS_KEYS,
  TAG_INDEPENDENT,
  TAG_CUSTOMER_WIFI,
  TAG_DOGS_PERMITTED,
  TAG_LAPTOPS_PERMITTED,
} from "@/utilities/constants";
import Pin from "./_Pin";

export default function Canvas() {
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
      filters.includes(TAG_INDEPENDENT) &&
      !location.tags.includes(TAG_INDEPENDENT)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_CUSTOMER_WIFI) &&
      !location.tags.includes(TAG_CUSTOMER_WIFI)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_DOGS_PERMITTED) &&
      !location.tags.includes(TAG_DOGS_PERMITTED)
    ) {
      return false;
    }

    if (
      filters.includes(TAG_LAPTOPS_PERMITTED) &&
      !location.tags.includes(TAG_LAPTOPS_PERMITTED)
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
      dragRotate={false}
      touchPitch={false}
      maxBounds={[-2.308159, 51.83705, -1.865959, 51.971346]}
      initialViewState={{ zoom: 12, latitude: 51.900091, longitude: -2.076931 }}
      style={{ gridRow: 1, gridColumn: 1, zIndex: 0 }}
    >
      <NavigationControl
        showCompass={false}
        style={{ margin: "1em", marginTop: "5.6em" }}
      />
      {locations.filter(filterLocationVisibility).map((location) => (
        <Pin key={location.id} {...location} />
      ))}
    </Map>
  );
}
