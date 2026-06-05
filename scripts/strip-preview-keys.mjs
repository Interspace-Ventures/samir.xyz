import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// Next.js writes random previewMode* keys into .next/prerender-manifest.json on
// every build. These are throwaway keys for Preview/Draft Mode (unused by this
// site), but Replit's deployment security scanner flags them as hard-coded
// secrets and blocks the publish. Blank them out after the build so the scan
// passes. Normal page serving is unaffected.
const file = '.next/prerender-manifest.json';

if (!existsSync(file)) {
  console.log(`[strip-preview-keys] ${file} not found, skipping`);
  process.exit(0);
}

try {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  if (data && data.preview) {
    data.preview.previewModeId = '';
    data.preview.previewModeSigningKey = '';
    data.preview.previewModeEncryptionKey = '';
    writeFileSync(file, JSON.stringify(data));
    console.log('[strip-preview-keys] cleared Next.js preview keys from', file);
  } else {
    console.log('[strip-preview-keys] no preview section found, nothing to do');
  }
} catch (err) {
  console.error('[strip-preview-keys] failed:', err.message);
  process.exit(1);
}
