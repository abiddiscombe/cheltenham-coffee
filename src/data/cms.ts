import { UUID } from "crypto";
import { CmsResultSingle, CmsResultMultiple } from "@/utilities/types/cms";

const CMS_HOST = process.env["NEXT_PRIVATE_CMS_HOST"]!;
const CMS_TOKEN = process.env["NEXT_PRIVATE_CMS_TOKEN"]!;
const CMS_COLLECTION = process.env["NEXT_PRIVATE_CMS_COLLECTION"]!;

export async function getAll(): Promise<
  [number, CmsResultMultiple | undefined]
> {
  const url = new URL(`https://${CMS_HOST}`);
  url.pathname = `/items/${CMS_COLLECTION}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  });

  if (res.status === 403) {
    // The CMS returns 403 instead of 404 for
    // missing records. This is a remedial override.
    return [404, undefined];
  }

  return [res.status, res.status === 200 ? await res.json() : undefined];
}

export async function getOne(id: UUID): Promise<[number, CmsResultSingle]> {
  const url = new URL(`https://${CMS_HOST}`);
  url.pathname = `/items/${CMS_COLLECTION}/${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  });

  return [res.status, res.status === 200 ? await res.json() : undefined];
}
