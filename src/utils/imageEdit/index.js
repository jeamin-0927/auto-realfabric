const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const fs = require("fs");
// install canvas on node -> https://github.com/Automattic/node-canvas

const imageEdit = async (src = './view/test') => {
  const rowImage = `${src}/image.jpg`;
  const mergeImage = await mergeImages([
    { src: rowImage, x: 0, y: 0 },
    { src: rowImage, x: 1024, y: 0 },
    { src: rowImage, x: 0, y: 1024 },
    { src: rowImage, x: 1024, y: 1024 },
  ], {
    Canvas: Canvas,
    Image: Image,
    width: 2048,
    height: 2048,
    quality: 1
  });
  const buffer = Buffer.from(mergeImage.split(`data:image/png;base64,`)[1], "base64");
  fs.writeFileSync(`${src}/output.jpg`, buffer);

  // return mergeImage.split(`data:image/png;base64,`)[1];
};

module.exports = imageEdit;