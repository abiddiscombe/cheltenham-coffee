"use client";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { BadgeAlertIcon, PanelLeftCloseIcon, XIcon } from "lucide-react";
import OverlayPanelExp from "./_OverlayPanelExp";
import OverlayPanelTags from "./_OverlayPanelTags";
import { NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import Spinner from "@/components/Spinner";
import Typography from "@/components/Typography";

// @todo Replace CSS-based conditional rendering
// of the close button with a client-side React hook.

export default function OverlayPanel() {
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

  async function getLocationDetails() {
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
  }

  useEffect(() => {
    if (locationId) {
      getLocationDetails();
    }

    return () => {
      // Clear stale data if user selects a
      // new location whilst the panel is visible.

      setLocationInfo(undefined);
    };
  }, [locationId]);

  return (
    <div className="z-30 flex items-stretch pointer-events-none">
      {locationId && (
        <div className="bg-white/80 backdrop-blur-xs p-8 shadow border-r border-r-primary-200 w-full sm:w-sm pointer-events-auto h-full grid gap-6 grid-rows-[1fr_auto_auto]">
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
          <Banner variant="warning">
            This app is a work in progress and some data may be inaccurate.
          </Banner>
          <div className="flex items-center gap-2">
            <Button className="grow" onClick={handleGiveFeedback}>
              <BadgeAlertIcon />
              Feedback
            </Button>
            <Button
              size="icon"
              onClick={handleClose}
              aria-label="Close Side Panel"
              className="hidden sm:flex"
            >
              <PanelLeftCloseIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
