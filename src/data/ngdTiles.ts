const OS_API_KEY = process.env["NEXT_PRIVATE_OS_API_KEY"]!;

const TILES_ORIGIN = "https://api.os.uk";
const TILES_PATHNAME = "maps/vector/ngd/ota/v1/collections/ngd-base/tiles/3857";

export async function getOne(zyx: string[]): Promise<[number, Blob?]> {
  const url = new URL(TILES_ORIGIN);
  url.pathname = [TILES_PATHNAME, ...zyx].join("/");

  const res = await fetch(url, {
    headers: {
      key: OS_API_KEY,
    },
  });

  return [res.status, res.status === 200 ? await res.blob() : undefined];
}
