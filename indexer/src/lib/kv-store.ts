import { createClient, type RedisClientType } from "redis";

// Re-use the same client across hot-reloads (Next.js / Vite / ts-node-dev)
declare global {
  // eslint-disable-next-line no-var
  var _redisClient: RedisClientType | undefined;
}

const redis = global._redisClient ?? createClient({ url: process.env.REDIS_URL });

if (!global._redisClient) {
  redis
    .on("error", (err) => console.error("[redis]", err))
    .connect()
    .catch((err) => console.error("[redis] connect()", err));

  global._redisClient = redis;
}

/* helpers — API kept identical to the @vercel/kv version */

export async function saveItem<T>(key: string, value: T, ttl?: number): Promise<void> {
  if (ttl) {
    await redis.setEx(key, ttl, JSON.stringify(value));
  } else {
    await redis.set(key, JSON.stringify(value));
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function saveOrGet<T>(
  key: string,
  compute: () => Promise<T> | T,
  ttl?: number
): Promise<T> {
  const cached = await getItem<T>(key);
  if (cached !== null) return cached;

  const fresh = await Promise.resolve(compute());
  await saveItem(key, fresh, ttl);
  return fresh;
}

export async function deleteItem(key: string): Promise<void> {
  await redis.del(key);
}
