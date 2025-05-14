import {
  HeartHandshakeIcon,
  WifiIcon,
  PawPrintIcon,
  CloudSunIcon,
  LaptopIcon,
} from "lucide-react";

// General
export const REPO_URL = "https://github.com/abiddiscombe/cheltenham-coffee";

// Unique Query Params
export const NUQS_KEYS = {
  FILTERS: "filters",
  LOCATION_ID: "location",
};

// Unique Location Tags
export const TAG_INDEPENDENT = "independent";
export const TAG_INDEPENDENT_ICON = HeartHandshakeIcon;

export const TAG_CUSTOMER_WIFI = "wifi";
export const TAG_CUSTOMER_WIFI_PENDING = `${TAG_CUSTOMER_WIFI}-pending`;
export const TAG_CUSTOMER_WIFI_ICON = WifiIcon;

export const TAG_DOGS_PERMITTED = "dogs-permitted";
export const TAG_DOGS_PERMITTED_PENDING = `${TAG_DOGS_PERMITTED}-pending`;
export const TAG_DOGS_PERMITTED_ICON = PawPrintIcon;

export const TAG_OUTSIDE_SEATING = "outside";
export const TAG_OUTSIDE_SEATING_PENDING = `${TAG_OUTSIDE_SEATING}-pending`;
export const TAG_OUTSIDE_SEATING_ICON = CloudSunIcon;

export const TAG_LAPTOPS_PERMITTED = "laptops-permitted";
export const TAG_LAPTOPS_PERMITTED_PENDING = `${TAG_LAPTOPS_PERMITTED}-pending`;
export const TAG_LAPTOPS_PERMITTED_ICON = LaptopIcon;
