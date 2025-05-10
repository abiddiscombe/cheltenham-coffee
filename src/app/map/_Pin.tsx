import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";
import { MapPinIcon } from "lucide-react";
import { Marker, useMap } from "@vis.gl/react-maplibre";
import { NUQS_KEYS } from "@/utilities/constants";
import { Location } from "@/utilities/types/location";

export default function Pin(p: Location) {
  const [activeLocationId, setActiveLocationId] = useQueryState(
    NUQS_KEYS.LOCATION_ID,
  );

  const { current: map } = useMap();

  function handleSelect() {
    setActiveLocationId(p.id);

    if (map) {
      // On mobile viewports, center the map slightly
      // above the central point, in order to account
      // for the information panel.
      const MAGIC_LAT_DIFF_LG_SCALE = 0.0016;
      const MAGIC_LAT_DIFF_SM_SCALE = 0.0065;

      const lng = p.longitude;
      const lat =
        window?.innerWidth <= 600
          ? p.latitude -
            (map.getZoom() >= 13
              ? MAGIC_LAT_DIFF_LG_SCALE
              : MAGIC_LAT_DIFF_SM_SCALE)
          : p.latitude;

      map?.flyTo({ center: [lng, lat] });
    }
  }

  const classes = twMerge(
    "h-8 w-8 sm:h-6 sm:w-6 text-white cursor-pointer duration-150",
    activeLocationId === p.id
      ? "fill-orange-800 h-10 w-10 sm:h-8 sm:w-8"
      : "fill-orange-600 sm:hover:h-7 sm:hover:w-7 hover:fill-orange-700 active:fill-orange-800",
  );

  return (
    <Marker
      anchor="bottom"
      latitude={p.latitude}
      longitude={p.longitude}
      className={activeLocationId === p.id ? "z-10" : "hover:z-10"}
    >
      <MapPinIcon className={classes} onClick={handleSelect} />
    </Marker>
  );
}
