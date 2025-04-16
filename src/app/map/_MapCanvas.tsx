"use client";
import { useEffect } from "react";
import * as pmtiles from "pmtiles";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "@vis.gl/react-maplibre";

// The basemap (OS Zoomstack via PMTiles) is loaded from
// an external file server (configuration per environment).
const BASEMAP_STYLE_URL = process.env["NEXT_PUBLIC_BASEMAP_STYLE_URL"];

export default function MapCanvas() {
  useEffect(() => {
    // Initialize the PMTiles protocol for
    // MapLibre and add it to the global object.
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
  }, []);

  return (
    <Map
      mapLib={maplibregl}
      mapStyle={BASEMAP_STYLE_URL}
      minZoom={12}
      maxZoom={14}
      maxBounds={[-2.308159, 51.83705, -1.865959, 51.971346]}
      initialViewState={{ zoom: 12, latitude: 51.900091, longitude: -2.076931 }}
      style={{ gridRow: 1, gridColumn: 1, zIndex: 0 }}
    ></Map>
  );
}
