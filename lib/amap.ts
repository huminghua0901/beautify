export async function geocodeCommunity(location: string) {
  const url = new URL("https://restapi.amap.com/v3/geocode/geo");
  url.searchParams.set("address", location);
  url.searchParams.set("key", process.env.AMAP_KEY || "");

  const resp = await fetch(url.toString());
  if (!resp.ok) {
    throw new Error(`AMap geocode failed: ${resp.status}`);
  }

  return resp.json();
}
