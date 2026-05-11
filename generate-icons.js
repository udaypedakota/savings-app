const sharp = require('sharp');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bg)"/>
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="320" font-weight="900" text-anchor="middle" fill="white">&#8377;</text>
</svg>`);

(async () => {
  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `public/icons/icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }
  // Also generate apple touch icon
  await sharp(svg).resize(180, 180).png().toFile(path.join(__dirname, 'public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');
})();
