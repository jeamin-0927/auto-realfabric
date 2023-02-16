const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const createInvertedImages = async (inputPath) => {
  try {
    // Load the original image asynchronously
    const image = await sharp(inputPath).toBuffer();

    // Invert the image from side to side and save as b.jpg
    const invertedB = await sharp(image).flip(true).toFile('b.jpg');

    // Invert the image upside down and save as c.jpg
    const invertedC = await sharp(image).flop(true).toFile('c.jpg');

    // Invert the image from side to side and upside down and save as d.jpg
    const invertedD = await sharp(image).flip(true).flop(true).toFile('d.jpg');

    console.log('Inverted images created successfully.');

  } catch (err) {
    console.error('Error:', err);
  }
}

const combineInvertedImages = async (inputPath) => {
  try {
    // Load the four inverted images asynchronously
    const [invertedA, invertedB, invertedC, invertedD] = await Promise.all([
      sharp(inputPath).toBuffer(),
      sharp('b.jpg').toBuffer(),
      sharp('c.jpg').toBuffer(),
      sharp('d.jpg').toBuffer()
    ]);

    // Resize each inverted image to half its original size
    const [metadataA, metadataB, metadataC, metadataD] = await Promise.all([
      sharp(invertedA).metadata(),
      sharp(invertedB).metadata(),
      sharp(invertedC).metadata(),
      sharp(invertedD).metadata()
    ]);

    const [resizedA, resizedB, resizedC, resizedD] = await Promise.all([
      sharp(invertedA).resize({ width: metadataA.width / 2, height: metadataA.height / 2 }).toBuffer(),
      sharp(invertedB).resize({ width: metadataB.width / 2, height: metadataB.height / 2 }).toBuffer(),
      sharp(invertedC).resize({ width: metadataC.width / 2, height: metadataC.height / 2 }).toBuffer(),
      sharp(invertedD).resize({ width: metadataD.width / 2, height: metadataD.height / 2 }).toBuffer()
    ]);

    // Create a new empty canvas twice the size of the resized images
    const canvas = sharp({
      create: {
        width: resizedA.width * 2,
        height: resizedA.height * 2,
        channels: 3,
        background: { r: 255, g: 255, b: 255 } // Set the background color to white
      }
    });

    // Compose the four resized inverted images onto the canvas in the specified layout
    await canvas.composite([
      { input: resizedA, top: 0, left: 0 },
      { input: resizedB, top: 0, left: resizedA.width },
      { input: resizedC, top: resizedA.height, left: 0 },
      { input: resizedD, top: resizedA.height, left: resizedA.width }
    ]).toFile('combined.jpg');

    console.log('Combined images saved to combined.jpg');

  } catch (err) {
    console.error('Error:', err);
  }
}


const imageEdit = async (src = './view/test') => {
  // Set the input image file path
  const inputPath = `${src}/image.jpg`;
  await createInvertedImages(inputPath);
  await combineInvertedImages(inputPath);
};

module.exports = imageEdit;