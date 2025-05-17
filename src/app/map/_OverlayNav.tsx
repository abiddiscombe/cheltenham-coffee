"use client";
import Button from "@/components/Button";
import { LOCATION_FILTERS, NUQS_KEYS } from "@/utilities/constants";
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

  return (
    <nav className="z-50 shadow-sm bg-white/80 backdrop-blur-xs border-b border-b-primary-200 px-4 sm:px-6 py-2 flex gap-4 items-center overflow-x-auto scrollbar-none">
      {LOCATION_FILTERS?.map((filter) => {
        const isActive = activeFilters?.includes(filter.id);
        const isPending = filter.pending;

        if (isPending) {
          return null;
        }

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
            <filter.icon />
            {filter.label}
          </Button>
        );
      })}
    </nav>
  );
}
