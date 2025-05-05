import { LaptopIcon, PawPrintIcon, StoreIcon, WifiIcon } from "lucide-react";
import {
  TAG_HAS_WIFI,
  TAG_PERMITS_DOGS,
  TAG_IS_INDEPENDENT,
  TAG_PERMITS_LAPTOPS,
} from "@/utilities/constants";
import Divider from "@/components/Divider";
import Typography from "@/components/Typography";

export default function MapOverlayTags(p: { tags: undefined | string[] }) {
  if (!p.tags || p.tags.length === 0) {
    return null;
  }

  function Tag(p: { icon: React.ReactNode; label: string }) {
    return (
      <li className="min-h-8 flex items-center gap-4 [&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:text-primary-600 [&>p]:last-of-type:m-0 [&>p]:m-0">
        {p.icon}
        <Typography variant="body">{p.label}</Typography>
      </li>
    );
  }

  return (
    <>
      <Divider />
      <ul>
        {p.tags.includes(TAG_IS_INDEPENDENT) && (
          <Tag icon={<StoreIcon />} label="Independent" />
        )}
        {p.tags.includes(TAG_HAS_WIFI) && (
          <Tag icon={<WifiIcon />} label="Customer Wi-Fi" />
        )}
        {p.tags.includes(TAG_PERMITS_DOGS) && (
          <Tag icon={<PawPrintIcon />} label="Permits Dogs" />
        )}
        {p.tags.includes(TAG_PERMITS_LAPTOPS) && (
          <Tag icon={<LaptopIcon />} label="Permits Laptops" />
        )}
      </ul>
    </>
  );
}
