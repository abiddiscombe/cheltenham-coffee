import { type StyleSpecification } from "maplibre-gl";
import { APP_ORIGIN, OS_ATTRIBUTION } from "./constants";
import ngdBaseStyle from "./ngdBaseStyle.json" with { type: "json" };

export function getBasemapConfig(): StyleSpecification {
  const tileUrl = `${APP_ORIGIN}/api/tiles/vectors/{z}/{y}/{x}`;

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
