import { type UUID } from "crypto";

export interface CmsDataEntry {
  id: UUID;
  name: string;
  status: "draft" | "archived" | "published";
  metadata_website?: string;
  metadata_address?: string;
  metadata_summary?: string;
  geometry: {
    coordinates: [number, number];
  };
}

export interface CmsResultSingle {
  data: CmsDataEntry;
}

export interface CmsResultMultiple {
  data: CmsDataEntry[];
}
