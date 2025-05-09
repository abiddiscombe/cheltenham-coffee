"use client";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { XIcon, LinkIcon, MapPinIcon } from "lucide-react";
import {
  NUQS_KEYS,
  TAG_CUSTOMER_WIFI,
  TAG_DOGS_PERMITTED,
  TAG_INDEPENDENT,
  TAG_LAPTOPS_PERMITTED,
} from "@/utilities/constants";
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
    <Surface className="m-4 min-h-64 max-w-sm p-8 bg-white/90 backdrop-blur-xs grid place-items-center">
      {locationInfoLoading ? (
        <OverlayPanelLoading />
      ) : (
        <>
          {locationInfoError ? (
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
                  <XIcon />
                </Button>
              </div>

              <Typography variant="body">
                A
                {locationInfo?.tags.includes(TAG_INDEPENDENT)
                  ? "n independent"
                  : " chain"}{" "}
                coffee shop
                {(locationInfo?.tags.includes(TAG_CUSTOMER_WIFI) ||
                  locationInfo?.tags.includes(TAG_LAPTOPS_PERMITTED)) &&
                  ", with "}
                {[
                  ...(locationInfo?.tags.includes(TAG_CUSTOMER_WIFI)
                    ? ["customer Wi-Fi"]
                    : []),
                  ...(locationInfo?.tags.includes(TAG_LAPTOPS_PERMITTED)
                    ? ["support for laptops"]
                    : []),
                ].join(" and ")}
                .
                {locationInfo?.tags.includes(TAG_DOGS_PERMITTED) &&
                  ` Well-behaved dogs are ${
                    locationInfo?.tags.includes(TAG_CUSTOMER_WIFI) ||
                    locationInfo?.tags.includes(TAG_LAPTOPS_PERMITTED)
                      ? "also "
                      : ""
                  }welcome!`}
              </Typography>

              <DescriptionList>
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
            </div>
          )}
        </>
      )}
    </Surface>
  );
}
