import axios from "axios";
import type { project } from "ponder:schema";
import { getItem, saveItem } from "./kv-store";
import { sanitizeUnicode } from "../util/sanitize-unicode";

const PINATA_JWT = process.env.PINATA_JWT;
const DEDICATED_GW = process.env.PINATA_GATEWAY_BASE ?? "https://gateway.pinata.cloud/ipfs/";

type ProjectMetadata = Pick<
  typeof project.$inferSelect,
  | "name"
  | "infoUri"
  | "logoUri"
  | "coverImageUri"
  | "description"
  | "twitter"
  | "telegram"
  | "tokens"
  | "tags"
  | "domain"
  | "projectTagline"
  | "discord"
>;

const makeURL = {
  shared: (cid: string) => `https://gateway.pinata.cloud/ipfs/${cid}`,
  dedicated: (cid: string) => `${DEDICATED_GW}${cid}`,
  ipfsIo: (cid: string) => `https://ipfs.io/ipfs/${cid}`,
};

const UA = {
  "User-Agent": "Mozilla/5.0 (compatible; metadata-fetch/1.0)",
  Accept: "application/json",
};

const AUTH_HDR = { Authorization: `Bearer ${PINATA_JWT}` };
const JSON_HDR = { ...AUTH_HDR, "Content-Type": "application/json" };
const GET_OPTS = { headers: { ...AUTH_HDR, ...UA }, timeout: 7_000 };

const getJSON = async <T>(url: string): Promise<T> => {
  const response = await axios.get(url, { ...GET_OPTS, responseType: "text" });
  console.info(`GET ${url} → 200`);

  const sanitizedResponse = sanitizeUnicode(response.data);
  return JSON.parse(sanitizedResponse) as T;
};

const pinByHash = async (cid: string) => {
  console.info(`[pinByHash] Pinning ${cid} …`);
  await axios.post(
    "https://api.pinata.cloud/pinning/pinByHash",
    { hashToPin: cid },
    { headers: JSON_HDR, timeout: 10_000 }
  );
  console.info("[pinByHash] Pin request accepted");
};

export async function fetchProjectMetadata(uri: string): Promise<ProjectMetadata | null> {
  const cid = uri.replace(/^ipfs:\/\//, "");
  if (!cid) {
    console.warn("[metadata] Empty CID from", uri);
    return null;
  }

  const cacheKey = `metadata-v2:${cid}`;
  const cached = await getItem<ProjectMetadata>(cacheKey);
  if (cached) {
    console.info(`[cache] HIT ${cacheKey}`);
    return cached;
  }

  for (const [tag, url] of Object.entries({
    dedicated: makeURL.dedicated(cid),
    shared: makeURL.shared(cid),
    ipfsIo: makeURL.ipfsIo(cid),
  })) {
    try {
      console.info(`[gateway] Trying ${tag} gateway`);
      const meta = await getJSON<ProjectMetadata>(url);
      await saveItem(cacheKey, meta);
      console.info(`[cache] SAVE ${cacheKey}`);
      return meta;
    } catch (e: any) {
      const msg = typeof e?.response?.data === "string" ? e.response.data : e.message;
      console.warn(`[gateway] ${tag} miss → ${msg}`);
    }
  }

  try {
    await pinByHash(cid);

    for (const delay of [1_000, 8_000, 30_000]) {
      console.info(`[poll] Waiting ${delay} ms for cache …`);
      await new Promise((r) => setTimeout(r, delay));
      try {
        const meta = await getJSON<ProjectMetadata>(makeURL.dedicated(cid));
        await saveItem(cacheKey, meta);
        console.info(`[cache] SAVE ${cacheKey}`);
        return meta;
      } catch (e: any) {
        const body = typeof e?.response?.data === "string" ? e.response.data : "";
        if (body.includes("ERR_ID:00006")) {
          console.info("[poll] Still propagating (00006) …");
          continue;
        }
        throw e;
      }
    }
  } catch (pinErr) {
    const body = axios.isAxiosError(pinErr) && pinErr.response ? pinErr.response.data : pinErr;
    console.warn("[pinning] Pin attempt failed:", body);
  }

  try {
    console.info("[fallback] Final ipfs.io attempt");
    const meta = await getJSON<ProjectMetadata>(makeURL.ipfsIo(cid));
    await saveItem(cacheKey, meta);
    console.info(`[cache] SAVE ${cacheKey}`);
    return meta;
  } catch (finalErr) {
    console.error("[metadata] All attempts failed:", finalErr?.toString?.());
    return null;
  }
}
