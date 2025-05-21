"use client";
import { useQueryState } from "nuqs";
import { XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";
import Button from "@/components/Button";
import Surface from "@/components/Surface";
import Typography from "@/components/Typography";
import OverlayPanelError from "./_OverlayPanelError";
import OverlayPanelLoading from "./_OverlayPanelLoading";
import OverlayPanelTags from "./_OverlayPanelTags";
import OverlayPanelSocial from "./_OverlayPanelSocial";

export default function OverlayPanel() {
  const [location, setLocation] = useQueryState(NUQS_KEYS.LOCATION_ID);
  const [locationInfo, setLocationInfo] = useState<LocationExtended>();
  const [locationInfoError, setLocationInfoError] = useState(false);
  const [locationInfoLoading, setLocationInfoLoading] = useState(true);

  function handleClosePanel() {
    setLocation(null);
  }

  const getDetails = useCallback(async () => {
    setLocationInfoError(false);
    setLocationInfoLoading(true);
    const res = await fetch(`/api/locations/${location}`);

    if (res.status !== 200) {
      console.warn(`Failed to GET '/api/locations/${location}'`);
      setLocationInfoError(true);
      setLocationInfoLoading(false);
      return;
    }

    const resJson = await res.json();
    setLocationInfo(resJson.location);
    setLocationInfoLoading(false);
  }, [location]);

  useEffect(() => {
    if (location) {
      getDetails();
    }

    return () => {
      // Clear stale data if user selects a
      // new location whilst the panel is visible.

      setLocationInfo(undefined);
    };
  }, [location, getDetails]);

  if (!location) {
    return null;
  }

  return (
    <Surface className="transition-fade m-4 min-h-64 max-w-sm p-8 grid place-items-center">
      {locationInfoLoading ? (
        <OverlayPanelLoading />
      ) : (
        <>
          {locationInfoError && typeof locationInfo === undefined ? (
            <OverlayPanelError
              handleRetry={getDetails}
              handleCancel={handleClosePanel}
            />
          ) : (
            <div className="h-full w-full">
              <div className="mb-4 flex items-start gap-2 justify-between">
                <Typography variant="h2" className="mt-1.5 mb-0">
                  {locationInfo?.name}
                </Typography>
                <Button size="icon" onClick={handleClosePanel}>
                  <XIcon className="stroke-3" />
                </Button>
              </div>
              {locationInfo?.tags && (
                <OverlayPanelTags tags={locationInfo.tags} />
              )}
              {(locationInfo?.metadata?.website ||
                locationInfo?.metadata?.address) && (
                <OverlayPanelSocial
                  website={locationInfo.metadata.website}
                  address={locationInfo.metadata.address}
                />
              )}
            </div>
          )}
        </>
      )}
    </Surface>
  );
}
