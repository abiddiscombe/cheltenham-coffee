// General
export const REPO_URL = "https://github.com/abiddiscombe/cheltenham-coffee";

// Unique Query Params
export const NUQS_KEYS = {
  FILTERS: "filters",
  SELECTED: "selected",
};

// Unique Location Tags
export const TAG_HAS_WIFI = "has-wifi";
export const TAG_PERMITS_DOGS = "permits-dogs";
export const TAG_IS_INDEPENDENT = "is-independent";
export const TAG_PERMITS_LAPTOPS = "permits-laptops";

// Ordnance Survey APIs
export const HOSTNAME = process.env["NEXT_PUBLIC_HOSTNAME"] ?? "";
export const OS_API_KEY = process.env["NEXT_PRIVATE_OS_API_KEY"] ?? "";
export const OS_ATTRIBUTION =
  "Contains Ordnance Survey data © Crown copyright. Use of this data is subject to terms and conditions.";

// CMS - Directus
export const CMS_HOST = process.env["NEXT_PRIVATE_CMS_HOST"] ?? "";
export const CMS_TOKEN = process.env["NEXT_PRIVATE_CMS_TOKEN"] ?? "";
export const CMS_COLLECTION = process.env["NEXT_PRIVATE_CMS_COLLECTION"] ?? "";
