/**
 * Generates a static blur-map.json with base64 LQIP placeholders for all product images.
 * Run manually: npx tsx scripts/generate-blur-map.ts
 * Or add to package.json as "generate-blur": "tsx scripts/generate-blur-map.ts"
 *
 * The output is saved to src/generated/blur-map.json and committed to git.
 * At runtime, the server just imports this file — no network calls needed.
 */

import { getPlaiceholder } from 'plaiceholder';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_PATH = path.join(process.cwd(), 'generated', 'blur-map.json');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getImageURLs(): Promise<{ key: string; fetchUrl: string; localPath?: string }[]> {
    // Read all .mdx product files and extract image paths/URLs
    const contentDir = path.join(process.cwd(), 'content', 'products');
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'));

    const images: { key: string; fetchUrl: string; localPath?: string }[] = [];
    const seen = new Set<string>();

    for (const file of files) {
        const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

        // Match remote tina.io URLs — key uses normalized path after __file/
        const remoteMatches = content.matchAll(/https:\/\/assets\.tina\.io\/[^\s"'\n\]]+/g);
        for (const match of remoteMatches) {
            const url = match[0].trim();
            const keyMatch = url.match(/__file\/(.+)$/);
            const key = keyMatch ? keyMatch[1] : url;
            if (!seen.has(key)) {
                seen.add(key);
                images.push({ key, fetchUrl: url });
            }
        }

        // Match local /uploads/ paths — key strips /uploads/ prefix, reads from public/
        const localMatches = content.matchAll(/- (\/uploads\/([^\s"'\n]+))/g);
        for (const match of localMatches) {
            const localPath = match[1].trim();
            const key = match[2].trim(); // e.g. "toothpaste/7.jpg"
            if (!seen.has(key)) {
                seen.add(key);
                const diskPath = path.join(process.cwd(), 'public', localPath);
                images.push({ key, fetchUrl: '', localPath: diskPath });
            }
        }
    }

    return images;
}

async function getBuffer(img: { fetchUrl: string; localPath?: string }): Promise<Buffer | null> {
    // Read local file directly from disk
    if (img.localPath) {
        if (!fs.existsSync(img.localPath)) return null;
        return fs.readFileSync(img.localPath);
    }
    // Fetch remote URL
    const res = await fetch(img.fetchUrl);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
}

async function generateBlurMap() {
    console.log('🔍 Scanning product images...');
    const images = await getImageURLs();
    console.log(`📸 Found ${images.length} unique images`);

    const blurMap: Record<string, string> = {};

    // Load existing map if present (to avoid re-fetching unchanged images)
    if (fs.existsSync(OUTPUT_PATH)) {
        const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
        Object.assign(blurMap, existing);
        console.log(`♻️  Loaded ${Object.keys(existing).length} cached entries`);
    }

    const newImages = images.filter(({ key }) => !blurMap[key]);
    console.log(`⬇️  Fetching ${newImages.length} new images...`);

    let done = 0;
    await Promise.all(
        newImages.map(async (img) => {
            try {
                const buffer = await getBuffer(img);
                if (!buffer) {
                    console.warn(`  ⚠️  Skipped (not found): ${img.localPath ?? img.fetchUrl}`);
                    return;
                }
                const { base64 } = await getPlaiceholder(buffer, { size: 10 });
                blurMap[img.key] = base64;
                done++;
                process.stdout.write(`  ✓ ${done}/${newImages.length}\r`);
            } catch (err) {
                console.warn(`  ⚠️  Failed: ${img.localPath ?? img.fetchUrl}`, err);
            }
        }),
    );

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(blurMap, null, 2));

    console.log(`\n✅ Saved blur-map.json with ${Object.keys(blurMap).length} entries → ${OUTPUT_PATH}`);
}

generateBlurMap().catch((err) => {
    console.error('❌ Failed:', err);
    process.exit(1);
});
