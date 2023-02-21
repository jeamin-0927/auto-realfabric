require('dotenv').config();
const fs = require('fs');

const autoUpload = require('./utils/autoUpload');

const main = async () => {
  await autoUpload();
}
main();