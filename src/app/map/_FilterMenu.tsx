"use client";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { LaptopIcon, PawPrintIcon, StoreIcon, WifiIcon } from "lucide-react";
import {
  NUQS_KEYS,
  TAG_HAS_WIFI_ID,
  TAG_PERMITS_DOGS_ID,
  TAG_PERMITS_LAPTOPS_ID,
  TAG_TYPE_LOCAL_ID,
} from "@/utilities/constants";
import Button from "@/components/Button";
import Surface from "@/components/Surface";

export default function FilterMenu() {
  const [filters, setFilters] = useQueryState(
    NUQS_KEYS.FILTERS,
    parseAsArrayOf(parseAsString),
  );

  function setFilter(filterId: string) {
    if (filters?.includes(filterId)) {
      setFilters(filters?.filter((item) => item !== filterId));
      return;
    }

    setFilters((old) => (old ? [...old, filterId] : [filterId]));
  }

  function determineStyle(filterId: string) {
    if (filters?.includes(filterId)) {
      return "bg-green-50 text-green-600";
    }

    if (!!filters?.length) {
      return "text-primary-500";
    }
  }

  return (
    <div className="z-30 p-4 flex items-start justify-end pointer-events-none">
      <Surface className="p-1.5 space-y-1 pointer-events-auto">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFilter(TAG_TYPE_LOCAL_ID)}
          className={determineStyle(TAG_TYPE_LOCAL_ID)}
        >
          <StoreIcon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFilter(TAG_HAS_WIFI_ID)}
          className={determineStyle(TAG_HAS_WIFI_ID)}
        >
          <WifiIcon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFilter(TAG_PERMITS_DOGS_ID)}
          className={determineStyle(TAG_PERMITS_DOGS_ID)}
        >
          <PawPrintIcon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setFilter(TAG_PERMITS_LAPTOPS_ID)}
          className={determineStyle(TAG_PERMITS_LAPTOPS_ID)}
        >
          <LaptopIcon />
        </Button>
      </Surface>
    </div>
  );
}
