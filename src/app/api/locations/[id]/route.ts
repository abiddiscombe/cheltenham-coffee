import { FeatureExtended } from "@/utilities/types/feature";

const mockedLocations: FeatureExtended[] = [
  {
    id: "cf7bbaf9-ccbd-4c2e-94f6-55a52e2e12ed",
    name: "Sample Location",
    latitude: 51.896496,
    longitude: -2.078562,
    metadata: {
      summary:
        "Ea laudantium et et. Repudiandae pariatur perspiciatis architecto mollitia. Labore nesciunt consequuntur repellat similique qui eum voluptas labore.",
      website: "https://example.com",
    },
  },
  {
    id: "8b344523-eaa7-4d09-8130-b0f5f2bedd9c",
    name: "Another Sample Location",
    latitude: 51.908964,
    longitude: -2.073938,
    metadata: {
      summary:
        "Sed soluta sapiente deserunt et sint. Eius dolores repellendus id sit enim reiciendis enim. Fugit distinctio dicta sed voluptatum velit ipsa.",
    },
  },
  {
    id: "dabf19a9-5239-4ff0-81c8-26b633d31d20",
    name: "Another Sample Location (2)",
    latitude: 51.894589,
    longitude: -2.069614,
  },
];

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const location = mockedLocations.find((loc) => loc.id === id);

  if (!location) {
    return Response.json(
      {
        error: "[ 404 ] Location Not Found",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    location: location,
  });
}
