import { UUID } from "crypto";
import { LocationExtended } from "@/utilities/types/location";
import { getOne } from "@/data/cms";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: UUID }> },
) {
  const { id } = await params;
  const [status, body] = await getOne(id);

  if (status !== 200) {
    return Response.json(
      {
        error:
          status === 404
            ? "Location not found."
            : "Upstream service unavailable.",
      },
      { status: status === 404 ? 404 : 500 },
    );
  }

  const responseBody: { location: LocationExtended } = {
    location: {
      id: body.data.id,
      name: body.data.name,
      latitude: body.data.geometry.coordinates[1],
      longitude: body.data.geometry.coordinates[0],
      tags: body.data.tags || [],
      metadata: {
        website: body.data.metadata_website,
        address: body.data.metadata_address,
        summary: body.data.metadata_summary,
      },
    },
  };

  return Response.json(responseBody);
}
