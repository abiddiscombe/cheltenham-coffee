import { type StyleSpecification } from "maplibre-gl";
import { PMTILES_DATA_URL } from "./constants";
import basemapLight from "./basemapLight.json" with { type: "json" };

function parseUrl(path: string, useProtocol?: boolean) {
  // @todo Convert to use actual URL parsing.

  const protocol = useProtocol ? "pmtiles://" : "";
  return [protocol, PMTILES_DATA_URL, path].join("");
}

export function getBasemapConfig(): StyleSpecification {
  // @todo Improve type definitions for imported JSON layers.

  return {
    version: 8,
    sources: {
      osOpenZoomstack: {
        type: "vector",
        tiles: [parseUrl("/tiles.pmtiles/{z}/{x}/{y}", true)],
      },
    },
    sprite: parseUrl("/sprites/sprites"),
    glyphs: parseUrl("/fonts/{fontstack}/{range}.pbf"),
    // @ts-ignore
    layers: basemapLight,
  };
}
