require('dotenv').config();
const fs = require('fs');

const generateImage = require('./services/auto_pattern_generator');
const downloadImage = require('./utils/downloadImage');
const getFullTime = require('./utils/getFullTime');
const imageEdit = require('./utils/imageEdit');

const main = async () => {
  const { ideation, dalle } = await generateImage();

  const time = getFullTime();
  const src = `./view/${time}`;
  const json = JSON.stringify({ ideation, src: dalle }, null, 2);

  fs.mkdirSync(src, { recursive: true })

  await downloadImage(dalle, `${src}/image.jpg`);

  fs.writeFileSync(`${src}/data.json`, json);
  await imageEdit(src);

  console.log(src);
}

for(let i = 0; i < 1; i++) {
  main();
}
