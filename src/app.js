require('dotenv').config();
const generateImage = require('./services/auto_pattern_generator');
const fs = require('fs');

const getDateROW = () => {
	const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  return `${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}${hours < 10 ? `0${hours}` : hours}${minutes < 10 ? `0${minutes}` : minutes}${seconds < 10 ? `0${seconds}` : seconds}${milliseconds}`;
}

const downloadImage = async (url, path) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(path, buffer);
}

const main = async () => {
  const { ideation, dalle } = await generateImage();

  const time = getDateROW();
  fs.mkdirSync(`./view/${time}`, { recursive: true })

  await downloadImage(dalle, `./view/${time}/image.jpg`);
  fs.writeFileSync(`./view/${time}/data.json`, JSON.stringify(ideation, null, 2));
  console.log(`./view/${time}/`);
}

for(let i = 0; i < 1; i++) {
  main();
}