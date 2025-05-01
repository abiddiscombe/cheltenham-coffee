import { LaptopIcon, PawPrintIcon, StoreIcon, WifiIcon } from "lucide-react";
import {
  TAG_HAS_WIFI,
  TAG_PERMITS_DOGS,
  TAG_PERMITS_LAPTOPS,
  TAG_TYPE_CHAIN_LOCAL,
  TAG_TYPE_CHAIN_NATIONAL,
  TAG_TYPE_LOCAL,
} from "@/utilities/constants";
import Divider from "@/components/Divider";
import Typography from "@/components/Typography";

export default function OverlayPanelTags(p: { tags: undefined | string[] }) {
  if (!p.tags || p.tags.length === 0) {
    return null;
  }

  function Tag(p: { icon: React.ReactNode; label: string }) {
    return (
      <li className="min-h-8 flex items-start gap-4 [&>svg]:mt-1.5 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-primary-600 [&>p]:last-of-type:m-0 [&>p]:m-0">
        {p.icon}
        <Typography variant="body">{p.label}</Typography>
      </li>
    );
  }

  return (
    <>
      <Divider />
      <ul>
        {p.tags.includes(TAG_TYPE_LOCAL) && (
          <Tag icon={<StoreIcon />} label="Independent" />
        )}
        {p.tags.includes(TAG_TYPE_CHAIN_LOCAL) && (
          <Tag icon={<StoreIcon />} label="Chain (Local)" />
        )}
        {p.tags.includes(TAG_TYPE_CHAIN_NATIONAL) && (
          <Tag icon={<StoreIcon />} label="Chain (National)" />
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
