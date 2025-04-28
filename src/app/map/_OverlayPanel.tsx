"use client";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import Button from "@/components/Button";
import Surface from "@/components/Surface";
import Typography from "@/components/Typography";
import { NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";

// @todo Improve loading state UI and
// implement Skeleton component layout.

export default function OverlayPanel() {
  const [locationDetails, setLocationDetails] = useState<LocationExtended>();
  const [activeLocation, setActiveLocation] = useQueryState(NUQS_KEYS.SELECTED);

  function handleClose() {
    setActiveLocation(null);
  }

  async function getLocationDetails() {
    const res = await fetch(`/api/locations/${activeLocation}`);

    if (res.status !== 200) {
      console.error(`Failed to GET '/api/locations/${activeLocation}'`);
      setActiveLocation(null);
      return;
    }

    const resJson = await res.json();
    setLocationDetails(resJson.location);
  }

  useEffect(() => {
    if (activeLocation) {
      getLocationDetails();
    }

    return () => {
      // Clear stale data if user selects a
      // new location whilst the panel is visible.

      setLocationDetails(undefined);
    };
  }, [activeLocation]);

  return (
    <div className="z-20 flex items-end sm:items-start p-2 sm:p-6 sm:pb-14 pointer-events-none">
      {activeLocation && (
        <Surface className="w-full sm:w-sm pointer-events-auto">
          <div className="mt-2 mb-4 flex items-start gap-6 justify-between">
            <Typography variant="h2" className="mb-0 mt-0.5">
              {locationDetails?.name}
            </Typography>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <XIcon className="h-4.5 w-4.5" />
            </Button>
          </div>
          {locationDetails?.metadata?.summary && (
            <Typography variant="body">
              {locationDetails?.metadata?.summary}
            </Typography>
          )}
        </Surface>
      )}
    </div>
  );
}
