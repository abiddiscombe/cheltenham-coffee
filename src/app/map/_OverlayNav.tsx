"use client";
import Button from "@/components/Button";
import {
  NUQS_KEYS,
  TAG_INDEPENDENT,
  TAG_INDEPENDENT_ICON,
  TAG_CUSTOMER_WIFI,
  TAG_CUSTOMER_WIFI_ICON,
  TAG_DOGS_PERMITTED,
  TAG_DOGS_PERMITTED_ICON,
  TAG_LAPTOPS_PERMITTED,
  TAG_LAPTOPS_PERMITTED_ICON,
} from "@/utilities/constants";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

export default function OverlayNav() {
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

  const filters = [
    {
      id: TAG_INDEPENDENT,
      icon: <TAG_INDEPENDENT_ICON />,
      label: "Independent",
    },
    {
      id: TAG_CUSTOMER_WIFI,
      icon: <TAG_CUSTOMER_WIFI_ICON />,
      label: "Wi-Fi",
    },
    {
      id: TAG_DOGS_PERMITTED,
      icon: <TAG_DOGS_PERMITTED_ICON />,
      label: "Dogs Permitted",
    },
    {
      id: TAG_LAPTOPS_PERMITTED,
      icon: <TAG_LAPTOPS_PERMITTED_ICON />,
      label: "Laptops Permitted",
    },
  ];

  return (
    <nav className="z-50 shadow-sm bg-white/80 backdrop-blur-sm border-b border-b-primary-200 px-8 py-2 flex gap-4 items-center overflow-x-auto scrollbar-none">
      {filters?.map((filter) => {
        const isActive = activeFilters?.includes(filter.id);

        return (
          <Button
            key={filter.id}
            role="checkbox"
            aria-checked={isActive}
            onClick={() => setFilter(filter.id)}
            className={[
              "rounded-full h-10 min-h-10 sm:h-8 sm:min-h-8 shadow-xs text-sm bg-white",
              isActive &&
                "bg-green-100 text-green-800 not:hover:border-green-200 hover:bg-green-200",
            ].join(" ")}
          >
            {filter.icon}
            {filter.label}
          </Button>
        );
      })}
    </nav>
  );
}
