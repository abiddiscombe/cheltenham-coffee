import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";
import { MapPinIcon } from "lucide-react";
import { Marker } from "@vis.gl/react-maplibre";
import { NUQS_KEYS } from "@/utilities/constants";
import { Feature } from "@/utilities/types/feature";

export default function Pin(p: Feature) {
  const [activeLocation, setActiveLocation] = useQueryState(NUQS_KEYS.SELECTED);

  const classes = twMerge(
    "h-6 w-6 text-white  cursor-pointer duration-150",
    activeLocation === p.id
      ? "fill-orange-800 h-8 w-8"
      : "fill-orange-600 hover:h-7 hover:w-7 hover:fill-orange-700 active:fill-orange-800",
  );

  function handleSelect() {
    setActiveLocation(p.id);
  }

  return (
    <Marker anchor="center" latitude={p.latitude} longitude={p.longitude}>
      <MapPinIcon className={classes} onClick={handleSelect} />
    </Marker>
  );
}
