const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const sharp = require('sharp');
const fs = require("fs");
// install canvas on node -> https://github.com/Automattic/node-canvas

const mergeSrc = (src) => `data:image/png;base64,${src}`;

const imageEdit = async (src = 'view/test') => {
  const rowImage = `${src}/image.jpg`;

  const bRow = await sharp(rowImage).flop(true).toBuffer();
  const b = Buffer.from(bRow).toString('base64');

  const cRow = await sharp(rowImage).flip(true).toBuffer();
  const c = Buffer.from(cRow).toString('base64');
  
  const dRow = await sharp(rowImage).flop(true).flip(true).toBuffer();
  const d = Buffer.from(dRow).toString('base64');

  const mergeImage = await mergeImages([
    { src: rowImage, x: 0, y: 0 },
    { src: mergeSrc(b), x: 1024, y: 0 },
    { src: mergeSrc(c), x: 0, y: 1024 },
    { src: mergeSrc(d), x: 1024, y: 1024 },
  ], {
    Canvas: Canvas,
    Image: Image,
    width: 2048,
    height: 2048,
    quality: 1
  });
  const buffer = Buffer.from(mergeImage.split(`data:image/png;base64,`)[1], "base64");
  fs.writeFileSync(`${src}/output.jpg`, buffer);

  return mergeImage;
};

module.exports = imageEdit;