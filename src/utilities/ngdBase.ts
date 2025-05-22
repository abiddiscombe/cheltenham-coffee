"use client";
import { type StyleSpecification } from "maplibre-gl";
import ngdBaseStyle from "./ngdBaseStyle.json" with { type: "json" };

function getTileUrl() {
  if (typeof window === "undefined") {
    // Block attempts to access the 'window' global
    // object in an SSR context (it does not exist).

    return "";
  }

  return [
    window.location.protocol,
    "//",
    window.location.host,
    "/api/tiles/vectors/{z}/{y}/{x}",
  ].join("");
}

export function getBasemapConfig(): StyleSpecification {
  const tileUrl = getTileUrl();

  // Ordnance Survey sprite and glyphs don't require
  // authentication - the client can access them directly.
  const spriteUrl =
    "https://api.os.uk/maps/vector/ngd/ota/v1/collections/ngd-base/styles/3857/sprites/sprite";
  const glyphsUrl =
    "https://api.os.uk/maps/vector/ngd/ota/v1/collections/ngd-base/styles/3857/fonts/{fontstack}/{range}.pbf";

  const attribution =
    "Contains Ordnance Survey data © Crown copyright. Use of this data is subject to terms and conditions.";

  return {
    version: 8,
    sprite: spriteUrl,
    glyphs: glyphsUrl,
    sources: {
      "ngd-base": {
        type: "vector",
        attribution: attribution,
        minzoom: 6,
        maxzoom: 19,
        scheme: "xyz",
        tiles: [tileUrl],
      },
    },
    // @ts-expect-error custom style document
    layers: ngdBaseStyle,
  };
}
