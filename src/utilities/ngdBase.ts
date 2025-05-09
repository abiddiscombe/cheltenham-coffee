import { type StyleSpecification } from "maplibre-gl";
import { HOST, HOST_INSECURE, OS_ATTRIBUTION } from "./constants";
import ngdBaseStyle from "./ngdBaseStyle.json" with { type: "json" };

function parseTileUrl() {
  const proto = Boolean(HOST_INSECURE) ? "http" : "https";
  const pathname = "api/tiles/vectors/{z}/{y}/{x}";

  return `${proto}://${HOST}/${pathname}`;
}

export function getBasemapConfig(): StyleSpecification {
  const tileUrl = parseTileUrl();

  // Ordnance Survey sprite and glyphs don't require
  // authentication - the client can access them directly.
  const spriteUrl =
    "https://api.os.uk/maps/vector/ngd/ota/v1/collections/ngd-base/styles/3857/sprites/sprite";
  const glyphsUrl =
    "https://api.os.uk/maps/vector/ngd/ota/v1/collections/ngd-base/styles/3857/fonts/{fontstack}/{range}.pbf";

  return {
    version: 8,
    sprite: spriteUrl,
    glyphs: glyphsUrl,
    sources: {
      "ngd-base": {
        type: "vector",
        attribution: OS_ATTRIBUTION,
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
