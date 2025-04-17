import { Feature } from "@/utilities/types/feature";

const mockedLocations: Feature[] = [
  {
    id: "cf7bbaf9-ccbd-4c2e-94f6-55a52e2e12ed",
    latitude: 51.896496,
    longitude: -2.078562,
  },
  {
    id: "8b344523-eaa7-4d09-8130-b0f5f2bedd9c",
    latitude: 51.908964,
    longitude: -2.073938,
  },
  {
    id: "dabf19a9-5239-4ff0-81c8-26b633d31d20",
    latitude: 51.894589,
    longitude: -2.069614,
  },
];

export function GET() {
  return Response.json({
    locations: mockedLocations,
  });
}
