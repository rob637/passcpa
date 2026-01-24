import sharp from 'sharp';
import fs from 'fs';

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="102" fill="url(#grad)"/>
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">CPA</text>
  <path d="M102 400 L410 400" stroke="#22c55e" stroke-width="30" stroke-linecap="round"/>
</svg>`;

const sizes = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateIcons() {
  for (const { name, size } of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(`public/${name}`);
    console.log(`Generated ${name}`);
  }
}

generateIcons().catch(console.error);
