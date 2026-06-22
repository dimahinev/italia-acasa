import blurMapRaw from '../../../generated/blur-map.json';

const blurMap: Record<string, string> = blurMapRaw as Record<string, string>;

/**
 * Returns the pregenerated LQIP base64 blurDataURL for a given image URL.
 * The blur map is generated once by running: pnpm generate-blur
 * and committed to the repo — no network calls at runtime.
 */
export function getBlurDataURL(src: string): string | undefined {
    return blurMap[src];
}
