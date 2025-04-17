import { type UUID } from "crypto";

// A slightly less convoluted type definition
// compared to transporting GeoJSON via the API.

export interface Feature {
  id: UUID;
  latitude: number;
  longitude: number;
}

export interface FeatureExtended extends Feature {
  name: string;
  metadata?: {
    summary?: string;
    website?: string;
    address?: string;
  };
}
