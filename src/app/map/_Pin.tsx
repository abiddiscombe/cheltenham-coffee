import { twMerge } from "tailwind-merge";
import { MapPinIcon } from "lucide-react";
import { Marker } from "@vis.gl/react-maplibre";

export default function Pin(p: {
  id: string;
  latitude: number;
  longitude: number;
}) {
  const active = false;
  const classes = twMerge(
    "h-6 w-6 text-white  cursor-pointer duration-150",
    active
      ? "fill-orange-800 h-8 w-8"
      : "fill-orange-600 hover:h-7 hover:w-7 hover:fill-orange-700 active:fill-orange-800",
  );

  return (
    <Marker anchor="center" latitude={p.latitude} longitude={p.longitude}>
      <MapPinIcon className={classes} />
    </Marker>
  );
}
