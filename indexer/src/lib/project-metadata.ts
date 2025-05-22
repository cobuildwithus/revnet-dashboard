import axios from "axios";
import type { project } from "ponder:schema";

/* ── ENV ─────────────────────────────────────────────────────────────── */
const PINATA_JWT = process.env.PINATA_JWT;
const DEDICATED_GW =
  process.env.PINATA_GATEWAY_BASE ?? "https://gateway.pinata.cloud/ipfs/";

/* ── TYPES ───────────────────────────────────────────────────────────── */
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

/* ── CONSTS ──────────────────────────────────────────────────────────── */
const makeURL = {
  shared: (cid: string) => `https://gateway.pinata.cloud/ipfs/${cid}`,
  dedicated: (cid: string) => `${DEDICATED_GW}${cid}`,
  ipfsIo: (cid: string) => `https://ipfs.io/ipfs/${cid}`,
};

const AUTH_HDR = { Authorization: `Bearer ${PINATA_JWT}` };
const JSON_HDR = { ...AUTH_HDR, "Content-Type": "application/json" };
const GET_OPTS = { headers: AUTH_HDR, timeout: 7_000 };

/* ── HELPERS ─────────────────────────────────────────────────────────── */
const getJSON = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url, GET_OPTS);
  console.info(`GET ${url} → 200`);
  return data;
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

/* ── MAIN ────────────────────────────────────────────────────────────── */
export async function fetchProjectMetadata(
  uri: string
): Promise<ProjectMetadata | null> {
  const cid = uri.replace(/^ipfs:\/\//, "");
  if (!cid) {
    console.warn("[metadata] Empty CID from", uri);
    return null;
  }

  /* 1️⃣  Try every gateway *without* pinning */
  for (const [tag, url] of Object.entries({
    dedicated: makeURL.dedicated(cid),
    shared: makeURL.shared(cid),
    ipfsIo: makeURL.ipfsIo(cid),
  })) {
    try {
      console.info(`[gateway] Trying ${tag} gateway`);
      return await getJSON<ProjectMetadata>(url);
    } catch (e: any) {
      const msg =
        typeof e?.response?.data === "string" ? e.response.data : e.message;
      console.warn(`[gateway] ${tag} miss → ${msg}`);
    }
  }

  /* 2️⃣  Nothing worked → pin, then poll dedicated */
  try {
    await pinByHash(cid);

    for (const delay of [1_000, 2_000, 4_000]) {
      console.info(`[poll] Waiting ${delay} ms for cache …`);
      await new Promise((r) => setTimeout(r, delay));
      try {
        return await getJSON<ProjectMetadata>(makeURL.dedicated(cid));
      } catch (e: any) {
        const body =
          typeof e?.response?.data === "string" ? e.response.data : "";
        if (body.includes("ERR_ID:00006")) {
          console.info("[poll] Still propagating (00006) …");
          continue;
        }
        throw e; // other error → break to fallback
      }
    }
  } catch (pinErr) {
    const body =
      axios.isAxiosError(pinErr) && pinErr.response
        ? pinErr.response.data
        : pinErr;
    console.warn("[pinning] Pin attempt failed:", body);
  }

  /* 3️⃣  Final fallback: ipfs.io one more time */
  try {
    console.info("[fallback] Final ipfs.io attempt");
    return await getJSON<ProjectMetadata>(makeURL.ipfsIo(cid));
  } catch (finalErr) {
    console.error("[metadata] All attempts failed:", finalErr?.toString?.());
    return null;
  }
}
