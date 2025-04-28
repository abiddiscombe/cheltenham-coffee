import { Location } from "@/utilities/types/location";
import { getAll } from "@/data/cms";

export async function GET() {
  const [status, body] = await getAll();

  if (status !== 200 || !body) {
    return Response.json(
      {
        error: "Upstream Service Unavailable",
      },
      { status: 500 },
    );
  }

  const responseBody: { locations: Location[] } = {
    locations: body.data.map((location) => ({
      id: location.id,
      latitude: location.geometry.coordinates[1],
      longitude: location.geometry.coordinates[0],
    })),
  };

  return Response.json(responseBody);
}
