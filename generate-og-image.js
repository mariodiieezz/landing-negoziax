const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 150;
const OUTPUT_PATH = path.join(__dirname, 'public', 'og-social.png');
const LOGO_PATH = path.join(__dirname, 'public', 'logo.png');

async function generateOgImage() {
  try {
    // Read and resize logo
    const logoBuffer = await sharp(LOGO_PATH)
      .resize(null, LOGO_HEIGHT, { fit: 'inside' })
      .png()
      .toBuffer();

    const logoMetadata = await sharp(logoBuffer).metadata();
    const logoWidth = logoMetadata.width;

    // Create white background
    const background = await sharp({
      create: {
        width: WIDTH,
        height: HEIGHT,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).png().toBuffer();

    // Create SVG text for "Negoziax"
    const svgText = `
      <svg width="${WIDTH}" height="100">
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="72"
          font-weight="bold"
          fill="#000000"
        >Negoziax</text>
      </svg>
    `;

    // Convert SVG to buffer
    const textBuffer = await sharp(Buffer.from(svgText))
      .png()
      .toBuffer();

    // Calculate positions
    const logoY = 180; // Position logo with space above
    const logoX = Math.round((WIDTH - logoWidth) / 2);
    const textY = logoY + LOGO_HEIGHT + 40; // 40px gap between logo and text

    // Composite everything
    const finalImage = await sharp(background)
      .composite([
        {
          input: logoBuffer,
          top: logoY,
          left: logoX
        },
        {
          input: textBuffer,
          top: textY,
          left: 0
        }
      ])
      .png()
      .toBuffer();

    // Save the image
    fs.writeFileSync(OUTPUT_PATH, finalImage);
    console.log(`✓ Generated ${OUTPUT_PATH}`);
    console.log(`  Dimensions: ${WIDTH}x${HEIGHT}px`);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOgImage();
