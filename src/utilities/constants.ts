// General
export const REPO_URL = "https://github.com/abiddiscombe/cheltenham-coffee";

// Unique Query Params
export const NUQS_KEYS = {
  SELECTED: "selected",
};

// Ordnance Survey APIs
export const HOSTNAME = process.env["NEXT_PUBLIC_HOSTNAME"] ?? "";
export const OS_API_KEY = process.env["NEXT_PRIVATE_OS_API_KEY"] ?? "";
export const OS_ATTRIBUTION =
  "Contains Ordnance Survey data © Crown copyright. Use of this data is subject to terms and conditions.";

// CMS - Directus
export const CMS_HOST = process.env["NEXT_PRIVATE_CMS_HOST"] ?? "";
export const CMS_TOKEN = process.env["NEXT_PRIVATE_CMS_TOKEN"] ?? "";
export const CMS_COLLECTION = process.env["NEXT_PRIVATE_CMS_COLLECTION"] ?? "";
