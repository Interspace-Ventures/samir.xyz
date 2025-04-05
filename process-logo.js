const sharp = require('sharp');

// Process the image to extract the white text and make the background transparent
async function processImage() {
  try {
    // The image has white text on purple background
    // We'll use the white content as a mask
    await sharp('attached_assets/1.png')
      // Extract alpha channel from white text (invert because white becomes transparent in extractChannel)
      .extractChannel(0) // Extract red channel (all channels are similar since text is white)
      .negate() // Invert so white text becomes black
      .threshold(200) // Make it binary - text becomes fully white, background fully black
      .toBuffer()
      .then(mask => {
        // Use the mask with the original image
        return sharp('attached_assets/1.png')
          .ensureAlpha()
          .joinChannel(mask, { raw: { width: 900, height: 418, channels: 1 } })
          .png()
          .toFile('public/assets/images/samir-logo-transparent.png');
      });

    console.log('Image processed successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();