import blurMapRaw from '../../../generated/blur-map.json';

const blurMap: Record<string, string> = blurMapRaw as Record<string, string>;

/**
 * Normalizes an image URL/path to the common key used in blur-map.json.
 * Dev:  /uploads/toothpaste/7.jpg → toothpaste/7.jpg
 * Prod: https://assets.tina.io/.../toothpaste/7.jpg → toothpaste/7.jpg
 * Other remote URLs are returned as-is (they are stored with full URL keys).
 */
function normalizeKey(src: string): string {
    // Tina CDN: extract path after __file/
    const tinaMatch = src.match(/__file\/(.+)$/);
    if (tinaMatch) return tinaMatch[1];

    // Local /uploads/ paths
    const uploadsMatch = src.match(/^\/uploads\/(.+)$/);
    if (uploadsMatch) return uploadsMatch[1];

    return src;
}

/**
 * Returns the pregenerated LQIP base64 blurDataURL for a given image URL.
 * The blur map is generated once by running: pnpm generate-blur
 * and committed to the repo — no network calls at runtime.
 */
export function getBlurDataURL(src: string): string | undefined {
    return blurMap[normalizeKey(src)];
}
