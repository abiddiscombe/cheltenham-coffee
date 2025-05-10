import { getOne } from "@/data/ngdTiles";

function validateTile(zyx: string[]) {
  if (zyx.length !== 3) {
    return [true, "must consist of three directory-nested values"];
  }

  const intCheck = /^\d+$/;
  const parsedZyx = zyx.map((item) => intCheck.test(item));
  if (parsedZyx.includes(false)) {
    return [true, "must only consist of integer values"];
  }

  const zoomLevel = parseInt(zyx[0]);
  if (zoomLevel < 12 || zoomLevel > 15) {
    return [true, "zoom level must be between 12 and 15"];
  }

  return [false, ""];
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ zyx: string[] }> },
) {
  const { zyx } = await params;
  const [tileError, tileErrorMessage] = validateTile(zyx);

  if (tileError) {
    return Response.json(
      {
        error: "Tile reference invalid.",
        hints: `The supplied tile coordinates ${tileErrorMessage}.`,
      },
      { status: 400 },
    );
  }

  const [status, body] = await getOne(zyx);

  if (status === 404) {
    return Response.json(
      {
        error: "Tile not found.",
        hints: "Access to this tile may be blocked or outside of GB coverage.",
      },
      { status: 404 },
    );
  }

  if (status !== 200) {
    return Response.json(
      {
        error: "Upstream tile server unavailable.",
      },
      { status: 502 },
    );
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Body-Source": "Ordnance Survey",
      "Cache-Control": "max-age=604800",
    },
  });
}
