import { UUID } from "crypto";
import { CmsResultSingle, CmsResultMultiple } from "@/utilities/types/cms";
import { CMS_HOST, CMS_TOKEN, CMS_COLLECTION } from "@/utilities/constants";

async function makeRequest(url: URL): Promise<[number, any]> {
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  });

  return [data.status, data.status === 200 ? await data.json() : undefined];
}

export async function getAll(): Promise<[number, CmsResultMultiple]> {
  const url = new URL(`https://${CMS_HOST}`);
  url.pathname = `/items/${CMS_COLLECTION}`;

  const res = await makeRequest(url);

  if (res[0] === 403) {
    // The CMS returns 403 instead of 404 for
    // missing records. This is a remedial override.
    return [404, res[1]];
  }

  return res;
}

export async function getOne(id: UUID): Promise<[number, CmsResultSingle]> {
  const url = new URL(`https://${CMS_HOST}`);
  url.pathname = `/items/${CMS_COLLECTION}/${id}`;

  return await makeRequest(url);
}
