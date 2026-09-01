/**
 * Cache helpers for server-side CMS fetches. On Cloudflare Workers the data is
 * kept in the per-region Cache API (shared across isolates), with the module
 * cache in each process as a secondary layer. Every failure is swallowed — a
 * cache miss simply means the CMS is fetched again.
 */

type EdgeCache = {
  match: (request: RequestInfo | URL) => Promise<Response | undefined>;
  put: (request: RequestInfo | URL, response: Response) => Promise<void>;
};

type EdgeCacheStorage = { default?: EdgeCache };

const CACHE_ORIGIN = "https://unityaliving.com";

function edgeCache(): EdgeCache | null {
  const storage = (globalThis as { caches?: EdgeCacheStorage }).caches;
  return storage?.default ?? null;
}

export async function readEdgeCache<T>(key: string): Promise<T | null> {
  const cache = edgeCache();
  if (!cache) return null;
  try {
    const response = await cache.match(`${CACHE_ORIGIN}/_cache/${key}`);
    if (!response || !response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function writeEdgeCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  const cache = edgeCache();
  if (!cache) return;
  try {
    const response = new Response(JSON.stringify(value), {
      headers: {
        "content-type": "application/json",
        "cache-control": `public, max-age=${ttlSeconds}`,
      },
    });
    await cache.put(`${CACHE_ORIGIN}/_cache/${key}`, response);
  } catch {
    // ignore — the module cache and direct fetches still work.
  }
}
