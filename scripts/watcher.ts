import fs from 'fs';
import path from 'path';

const targetDir = path.join(process.cwd(), 'content/products');

function slugify(title: string) {
    return (title || '')
        .toLowerCase()
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/î/g, 'i')
        .replace(/ș/g, 's')
        .replace(/ț/g, 't')
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''); // Keep only alphanumeric and dashes
}

export function startWatcher() {
    if (!fs.existsSync(targetDir)) {
        return;
    }

    console.log(`[Watcher] Starting to watch ${targetDir} for product title changes...`);

    let timeout: NodeJS.Timeout;
    fs.watch(targetDir, (eventType, filename) => {
        if (!filename || !filename.endsWith('.mdx')) return;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const filePath = path.join(targetDir, filename);
            if (!fs.existsSync(filePath)) return;

            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
                if (!match) return;

                const frontmatter = match[1];
                const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
                if (!titleMatch) return;

                const title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
                const expectedSlug = slugify(title);
                const currentSlug = path.basename(filename, '.mdx');

                if (expectedSlug && expectedSlug !== currentSlug) {
                    const newFilePath = path.join(targetDir, `${expectedSlug}.mdx`);
                    if (fs.existsSync(newFilePath)) {
                        console.warn(
                            `[Watcher] Cannot rename ${filename} to ${expectedSlug}.mdx: file already exists.`,
                        );
                        return;
                    }

                    console.log(
                        `[Watcher] Renaming product file: ${filename} -> ${expectedSlug}.mdx`,
                    );
                    fs.renameSync(filePath, newFilePath);
                }
            } catch (err) {
                console.error(`[Watcher] Error processing file ${filename}:`, err);
            }
        }, 300);
    });
}
