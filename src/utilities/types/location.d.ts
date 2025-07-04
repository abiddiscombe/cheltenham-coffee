import { type UUID } from "crypto";

// A slightly less convoluted type definition
// compared to transporting GeoJSON via the API.

export interface Location {
  id: UUID;
  tags: string[];
  latitude: number;
  longitude: number;
}

export interface LocationExtended extends Location {
  name: string;
  metadata?: {
    summary?: string;
    website?: string;
    address?: string;
  };
}
