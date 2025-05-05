"use client";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { LaptopIcon, PawPrintIcon, StoreIcon, WifiIcon } from "lucide-react";
import {
  NUQS_KEYS,
  TAG_HAS_WIFI,
  TAG_PERMITS_DOGS,
  TAG_IS_INDEPENDENT,
  TAG_PERMITS_LAPTOPS,
} from "@/utilities/constants";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";

export default function HeaderFilters() {
  const pathname = usePathname();

  const [activeFilters, setActiveFilters] = useQueryState(
    NUQS_KEYS.FILTERS,
    parseAsArrayOf(parseAsString),
  );

  function setFilter(filterId: string) {
    if (activeFilters?.includes(filterId)) {
      setActiveFilters(activeFilters?.filter((item) => item !== filterId));
      return;
    }

    setActiveFilters((old) => (old ? [...old, filterId] : [filterId]));
  }

  if (pathname !== "/map") {
    return null;
  }

  const filters = [
    {
      id: TAG_IS_INDEPENDENT,
      icon: <StoreIcon />,
      label: "Independent",
      className: "rounded-r-none",
    },
    {
      id: TAG_HAS_WIFI,
      icon: <WifiIcon />,
      label: "Customer Wi-Fi",
      className: "rounded-none",
    },
    {
      id: TAG_PERMITS_DOGS,
      icon: <PawPrintIcon />,
      label: "Permits Dogs",
      className: "rounded-none",
    },
    {
      id: TAG_PERMITS_LAPTOPS,
      icon: <LaptopIcon />,
      label: "Permits Laptops",
      className: "rounded-l-none",
    },
  ];

  return (
    <div className="flex items-center">
      {filters?.map((filter) => (
        <Button
          key={filter.id}
          size="icon"
          variant="ghost"
          aria-label={filter.label}
          onClick={() => setFilter(filter.id)}
          className={[
            activeFilters?.includes(filter.id)
              ? "bg-green-200/80 text-green-700"
              : "bg-primary-50",
            "w-11 max-w-11",
            filter.className,
          ].join(" ")}
        >
          {filter.icon}
        </Button>
      ))}
    </div>
  );
}
