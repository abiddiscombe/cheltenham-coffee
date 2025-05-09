import {
  HeartHandshakeIcon,
  WifiIcon,
  PawPrintIcon,
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
export const TAG_CUSTOMER_WIFI_ICON = WifiIcon;

export const TAG_DOGS_PERMITTED = "dogs-permitted";
export const TAG_DOGS_PERMITTED_ICON = PawPrintIcon;

export const TAG_LAPTOPS_PERMITTED = "laptops-permitted";
export const TAG_LAPTOPS_PERMITTED_ICON = LaptopIcon;

// Ordnance Survey APIs
export const HOSTNAME = process.env["NEXT_PUBLIC_HOSTNAME"] ?? "";
export const OS_API_KEY = process.env["NEXT_PRIVATE_OS_API_KEY"] ?? "";
export const OS_ATTRIBUTION =
  "Contains Ordnance Survey data © Crown copyright. Use of this data is subject to terms and conditions.";

// CMS - Directus
export const CMS_HOST = process.env["NEXT_PRIVATE_CMS_HOST"] ?? "";
export const CMS_TOKEN = process.env["NEXT_PRIVATE_CMS_TOKEN"] ?? "";
export const CMS_COLLECTION = process.env["NEXT_PRIVATE_CMS_COLLECTION"] ?? "";
