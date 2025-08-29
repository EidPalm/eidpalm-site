// src/lib/likes.ts (server-only helpers)

import { kv as vercelKV } from "@vercel/kv";

const hasKV =
  Boolean(process.env.KV_REST_API_URL) &&
  Boolean(process.env.KV_REST_API_TOKEN);

// We'll only call KV if env is configured; otherwise use in-memory Map
const kv = vercelKV;
const memory = new Map<string, number>();
const key = (id: string) => `design:${id}:likes`;

export async function getLikes(ids: string[]) {
  const entries = await Promise.all(
    ids.map(async (id) => {
      if (hasKV) {
        const n = await kv.get<number>(key(id));
        return [id, Number(n || 0)] as const;
      } else {
        return [id, memory.get(key(id)) || 0] as const;
      }
    })
  );
  return Object.fromEntries(entries) as Record<string, number>;
}

export async function incrementLike(id: string) {
  if (hasKV) {
    const n = await kv.incr(key(id));
    return Number(n);
  } else {
    const k = key(id);
    const n = (memory.get(k) || 0) + 1;
    memory.set(k, n);
    return n;
  }
}

export const isKVConfigured = hasKV;
