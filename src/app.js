require('dotenv').config();
const fs = require('fs');

const generateImage = require('./services/auto_pattern_generator');
const downloadImage = require('./utils/downloadImage');
const getFullTime = require('./utils/getFullTime');
const imageEdit = require('./utils/imageEdit');
const autoUpload = require('./utils/autoUpload');

const main = async () => {
  const { ideation, dalle } = await generateImage();

  const time = getFullTime();
  const src = `view/${time}`;
  const json = JSON.stringify({ ...ideation, src: dalle }, null, 2);

  fs.mkdirSync(src, { recursive: true });

  await downloadImage(dalle, `${src}/image.jpg`);

  fs.writeFileSync(`${src}/data.json`, json);
  await imageEdit(src);

  console.log(src);
  const upload = await autoUpload(src);
  console.log(upload);
}

const start = async (loop) => {
  for(let i = 0; i < loop; i++) {
    let statues = false;
    try{
      await main();
      statues = true;
    }
    catch (e){
      console.log(e);
    }
    console.log(`---------- ${i+1}/${loop}: ${statues} ----------`);
  }
}

start(5);