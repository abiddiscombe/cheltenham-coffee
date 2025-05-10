# cheltenham-coffee

A web map of coffee shops in Cheltenham (United Kingdom), with support for location filtering. Built with NextJS, alongside Tailwind CSS, CVA, MapLibre GL JS, and the Ordnance Survey NGD Tiles API. Location data is stored in a Directus CMS instance.

> Disclaimer: The accuracy of information within this application represents a best-effort and is not guaranteed.

## Rationale

- I like coffee.
- I want to help friends find places to meet.
- I want to practice with NextJS, CVA, MapLibre, and using a CMS (via HTTP REST API).
- Hopefully this tool also helps to advertise local businesses.

## Development

### Environment Variables

`NEXT_PRIVATE_CMS_HOST` \
[ Required ] The hostname of the CMS service instance.

`NEXT_PRIVATE_CMS_TOKEN` \
[ Required ] A valid CMS user token with read/write access to the relevant collection(s).

`NEXT_PRIVATE_CMS_COLLECTION` \
[ Required ] The CMS Collection name / identifier which contains the location data.

`NEXT_PRIVATE_OS_API_KEY` \
[ Required ] A valid Ordnance Survey API Key which provides access to the NGD Tiles API.
