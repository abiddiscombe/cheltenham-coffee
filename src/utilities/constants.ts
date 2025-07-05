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

export const LOCATION_FILTERS = [
  {
    id: "independent",
    icon: HeartHandshakeIcon,
    label: "Independent",
    pending: false,
  },
  {
    id: "wifi",
    icon: WifiIcon,
    label: "Customer Wi-Fi",
    pending: false,
  },
  {
    id: "wifi-pending",
    icon: WifiIcon,
    label: "Customer Wi-Fi (TBC)",
    pending: true,
  },
  {
    id: "laptops-permitted",
    icon: LaptopIcon,
    label: "Laptops Welcome",
    pending: false,
  },
  {
    id: "laptops-permitted-pending",
    icon: LaptopIcon,
    label: "Laptops Permitted (TBC)",
    pending: true,
  },
  {
    id: "dogs-permitted",
    icon: PawPrintIcon,
    label: "Dogs Welcome",
    pending: false,
  },
  {
    id: "dogs-permitted-pending",
    icon: PawPrintIcon,
    label: "Dogs Welcome (TBC)",
    pending: true,
  },
  {
    id: "outside",
    icon: CloudSunIcon,
    label: "Outside Seating",
    pending: false,
  },
  {
    id: "outside-pending",
    icon: CloudSunIcon,
    label: "Outside Seating (TBC)",
    pending: true,
  },
];
