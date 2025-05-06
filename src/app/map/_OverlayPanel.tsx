"use client";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import {
  InfoIcon,
  Share2Icon,
  SidebarCloseIcon,
  SidebarIcon,
} from "lucide-react";
import { NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";
import Button from "@/components/Button";
import Banner from "@/components/Banner";
import Surface from "@/components/Surface";
import Spinner from "@/components/Spinner";
import Typography from "@/components/Typography";
import OverlayPanelExp from "./_OverlayPanelExp";
import OverlayPanelTags from "./_OverlayPanelTags";

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
    <Surface className="m-4 p-6 bg-white/80 max-w-sm backdrop-blur-sm">
      <Button
        size="icon"
        onClick={handleClose}
        aria-label="Close Panel"
        className="mb-6"
      >
        {locationId ? <SidebarCloseIcon /> : <SidebarIcon />}
      </Button>
      {locationInfoLoading && !locationInfo ? (
        <div className="h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-start justify-between">
            <Typography variant="h2" className="mb-0">
              {locationInfo?.name}
            </Typography>
          </div>
          {locationInfo?.metadata?.summary && (
            <Typography variant="body">
              {locationInfo?.metadata?.summary}
            </Typography>
          )}
          <OverlayPanelExp metadata={locationInfo?.metadata} />
          <OverlayPanelTags tags={locationInfo?.tags} />
          <div className="mt-6 flex gap-2 items-center">
            <Button onClick={handleGiveFeedback} className="grow">
              <InfoIcon />
              Suggest Feedback
            </Button>
            <Button size="icon">
              <Share2Icon />
            </Button>
          </div>
        </>
      )}
      <Banner variant="warning" className="mt-4">
        This app is a work in progress and some data may be inaccurate.
      </Banner>
    </Surface>
  );
}
