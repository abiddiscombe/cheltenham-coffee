import { Location } from "@/utilities/types/location";
import { getAll } from "@/data/cms";

export async function GET() {
  const [status, body] = await getAll();

  if (status !== 200 || !body) {
    return Response.json(
      {
        error: "Upstream service unavailable.",
      },
      { status: 500 },
    );
  }

  const responseBody: { locations: Location[] } = {
    locations: body.data.map((location) => ({
      id: location.id,
      tags: location.tags || [],
      latitude: location.geometry.coordinates[1],
      longitude: location.geometry.coordinates[0],
    })),
  };

  return Response.json(responseBody);
}
