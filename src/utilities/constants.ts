// General
export const REPO_URL = "https://github.com/abiddiscombe/cheltenham-coffee";

// Unique Query Params
export const NUQS_KEYS = {
  FILTERS: "filters",
  SELECTED: "selected",
};

// Unique Location Tags
export const TAG_TYPE_LOCAL = "typeLocal";
export const TAG_TYPE_CHAIN_LOCAL = "typeChainLocal";
export const TAG_TYPE_CHAIN_NATIONAL = "typeChainNational";
export const TAG_HAS_WIFI = "hasWifi";
export const TAG_PERMITS_DOGS = "permitsDogs";
export const TAG_PERMITS_LAPTOPS = "permitsLaptops";

// Unique Location Tags (Shorthand)
export const TAG_TYPE_LOCAL_ID = "tl";
export const TAG_TYPE_CHAIN_LOCAL_ID = "tcl";
export const TAG_TYPE_CHAIN_NATIONAL_ID = "tcn";
export const TAG_HAS_WIFI_ID = "hw";
export const TAG_PERMITS_DOGS_ID = "pd";
export const TAG_PERMITS_LAPTOPS_ID = "pl";

// Ordnance Survey APIs
export const HOSTNAME = process.env["NEXT_PUBLIC_HOSTNAME"] ?? "";
export const OS_API_KEY = process.env["NEXT_PRIVATE_OS_API_KEY"] ?? "";
export const OS_ATTRIBUTION =
  "Contains Ordnance Survey data © Crown copyright. Use of this data is subject to terms and conditions.";

// CMS - Directus
export const CMS_HOST = process.env["NEXT_PRIVATE_CMS_HOST"] ?? "";
export const CMS_TOKEN = process.env["NEXT_PRIVATE_CMS_TOKEN"] ?? "";
export const CMS_COLLECTION = process.env["NEXT_PRIVATE_CMS_COLLECTION"] ?? "";
