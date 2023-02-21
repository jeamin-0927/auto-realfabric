require('dotenv').config();

const autoUpload = require('./utils/autoUpload');

const main = async () => {
  await autoUpload('view/20230221215151231');
}
main();