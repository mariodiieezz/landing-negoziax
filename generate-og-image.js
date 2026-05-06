const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 200;
const OUTPUT_PATH = path.join(__dirname, 'public', 'og-social.png');
const LOGO_PATH = path.join(__dirname, 'public', 'logo.png');

async function generateOgImage() {
  try {
    // Read and resize logo with high quality
    const logoBuffer = await sharp(LOGO_PATH)
      .resize(null, LOGO_HEIGHT, { fit: 'inside', withoutEnlargement: false })
      .png({ compressionLevel: 0, quality: 100 })
      .toBuffer();

    const logoMetadata = await sharp(logoBuffer).metadata();
    const logoWidth = logoMetadata.width;

    // Create pure white background (#FFFFFF)
    const background = await sharp({
      create: {
        width: WIDTH,
        height: HEIGHT,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).png({ compressionLevel: 0 }).toBuffer();

    // Calculate vertical center position
    const logoY = Math.round((HEIGHT - LOGO_HEIGHT) / 2);
    const logoX = 150; // Position slightly to the left as requested

    // Composite logo only
    const finalImage = await sharp(background)
      .composite([
        {
          input: logoBuffer,
          top: logoY,
          left: logoX
        }
      ])
      .png({ compressionLevel: 0, quality: 100 })
      .toBuffer();

    // Save the image
    fs.writeFileSync(OUTPUT_PATH, finalImage);
    console.log(`✓ Generated ${OUTPUT_PATH}`);
    console.log(`  Dimensions: ${WIDTH}x${HEIGHT}px`);
    console.log(`  Logo position: x=${logoX}, y=${logoY} (centered vertically)`);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOgImage();
