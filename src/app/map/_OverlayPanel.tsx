"use client";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { XIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { LOCATION_FILTERS, NUQS_KEYS } from "@/utilities/constants";
import { LocationExtended } from "@/utilities/types/location";
import Button from "@/components/Button";
import Surface from "@/components/Surface";
import Typography from "@/components/Typography";
import ExternalLink from "@/components/ExternalLink";
import DescriptionList from "@/components/DescriptionList";
import DescriptionListEntry from "@/components/DescriptionListEntry";
import OverlayPanelError from "./_OverlayPanelError";
import OverlayPanelLoading from "./_OverlayPanelLoading";

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
    <Surface className="transition-fade m-4 min-h-64 max-w-sm p-8 bg-white/80 backdrop-blur-xs grid place-items-center">
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
                <Button size="icon" variant="ghost" onClick={handleClosePanel}>
                  <XIcon className="stroke-3" />
                </Button>
              </div>
              <DescriptionList className="mb-6">
                {locationInfo?.metadata?.website && (
                  <DescriptionListEntry
                    icon={<LinkIcon />}
                    name="Website"
                    summary={
                      <ExternalLink
                        href={`https://${locationInfo.metadata.website}`}
                      >
                        {locationInfo.metadata.website.replace("www.", "")}
                      </ExternalLink>
                    }
                  />
                )}
                {locationInfo?.metadata?.address && (
                  <DescriptionListEntry
                    icon={<MapPinIcon />}
                    name="Directions"
                    summary={
                      <>
                        Directions: &ensp;
                        <ExternalLink
                          href={`https://maps.apple.com/directions?destination=${locationInfo?.metadata.address}`}
                        >
                          Apple
                        </ExternalLink>
                        &ensp;|&ensp;
                        <ExternalLink
                          href={`https://google.com/maps/dir//${locationInfo.metadata.address}`}
                        >
                          Google
                        </ExternalLink>
                      </>
                    }
                  />
                )}
              </DescriptionList>
              <DescriptionList>
                {LOCATION_FILTERS.map((filter) => {
                  if (locationInfo?.tags.includes(filter.id)) {
                    return (
                      <DescriptionListEntry
                        key={filter.id}
                        icon={<filter.icon />}
                        name=""
                        summary={filter.label}
                      />
                    );
                  }
                })}
              </DescriptionList>
            </div>
          )}
        </>
      )}
    </Surface>
  );
}
