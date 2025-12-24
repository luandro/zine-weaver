import { zineAssetUrls } from "@/data/zines";

const OFFLINE_CACHE = "zine-offline-assets-v1";

export const prefetchZineAssets = async () => {
  if (typeof window === "undefined" || !("caches" in window)) {
    return;
  }

  if (!navigator.onLine) {
    return;
  }

  const urls = zineAssetUrls.filter((url) => Boolean(url));
  if (urls.length === 0) {
    return;
  }

  try {
    const cache = await caches.open(OFFLINE_CACHE);

    await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const response = await fetch(url, { cache: "reload" });
          if (response.ok) {
            await cache.put(url, response.clone());
          }
        } catch {
          // Ignore individual asset failures to keep the batch resilient.
        }
      })
    );
  } catch {
    // Swallow cache errors to avoid blocking app boot.
  }
};
