import { Zine, Block } from "@/types/zine";
import { getFallbackImageUrl } from "@/lib/assets";
import { sampleZine } from "./sample-zine";

export const allZines: Zine[] = [sampleZine];

const getBlockAssetUrl = (block: Block): string | null => {
  if (block.type === "cover" || block.type === "scene") {
    return block.image.asset_path ?? null;
  }

  return null;
};

const uniqueAssetUrls = new Set<string>([
  getFallbackImageUrl(),
  getFallbackImageUrl(192),
  getFallbackImageUrl(512),
]);

for (const zine of allZines) {
  for (const page of zine.pages) {
    for (const block of page.blocks) {
      const assetUrl = getBlockAssetUrl(block);
      if (assetUrl) {
        uniqueAssetUrls.add(assetUrl);
      }
    }
  }
}

export const zineAssetUrls = Array.from(uniqueAssetUrls);
