"use client";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { PanelLeftCloseIcon, XIcon } from "lucide-react";
import OverlayPanelExp from "./_MapOverlayExp";
import OverlayPanelTags from "./_MapOverlayTags";
import { NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import Spinner from "@/components/Spinner";
import Typography from "@/components/Typography";
import Surface from "@/components/Surface";

// @todo Replace CSS-based conditional rendering
// of the close button with a client-side React hook.

export default function MapOverlay() {
  const [locationId, setLocationId] = useQueryState(NUQS_KEYS.SELECTED);

  const [locationInfo, setLocationInfo] = useState<LocationExtended>();
  const [locationInfoLoading, setLocationInfoLoading] = useState(false);

  function handleClose() {
    setLocationId(null);
  }

  function handleGiveFeedback() {
    // @todo: Add feedback modal.
    return;
  }

  const getLocationDetails = useCallback(async () => {
    setLocationInfoLoading(true);
    const res = await fetch(`/api/locations/${locationId}`);

    if (res.status !== 200) {
      console.error(`Failed to GET '/api/locations/${locationId}'`);
      setLocationId(null);
      return;
    }

    const resJson = await res.json();
    setLocationInfo(resJson.location);
    setLocationInfoLoading(false);
  }, [locationId, setLocationId]);

  useEffect(() => {
    if (locationId) {
      getLocationDetails();
    }

    return () => {
      // Clear stale data if user selects a
      // new location whilst the panel is visible.

      setLocationInfo(undefined);
    };
  }, [locationId, getLocationDetails]);

  if (!locationId) {
    return null;
  }

  return (
    <div className="z-20 p-4 pointer-events-none">
      <Surface className="bg-white/80 max-w-sm backdrop-blur-xs pointer-events-auto">
        <nav className="mb-4 flex items-center gap-2">
          <Button
            size="icon"
            onClick={handleClose}
            aria-label="Close Side Panel"
            className="hidden sm:flex"
          >
            <PanelLeftCloseIcon />
          </Button>
        </nav>
        {locationInfoLoading && !locationInfo ? (
          <div className="h-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-start justify-between">
              <Typography variant="h2" className="mb-0">
                {locationInfo?.name}
              </Typography>
              <Button
                size="icon"
                onClick={handleClose}
                aria-label="Close Side Panel"
                className="flex sm:hidden"
              >
                <XIcon />
              </Button>
            </div>
            {locationInfo?.metadata?.summary && (
              <Typography variant="body">
                {locationInfo?.metadata?.summary}
              </Typography>
            )}
            <OverlayPanelExp metadata={locationInfo?.metadata} />
            <OverlayPanelTags tags={locationInfo?.tags} />
          </div>
        )}
        <Banner variant="warning" className="mt-4">
          This app is a work in progress and some data may be inaccurate.
        </Banner>
      </Surface>
    </div>
  );
}
