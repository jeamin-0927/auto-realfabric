require('dotenv').config();

const autoUpload = require('./utils/autoUpload');
const autoRemove = require('./utils/autoRemove');


const main = async () => {
  for(let i of [45468,45506 ,45509,45511]){
    console.log(`--------------- ${i} ---------------`)
    const data = await autoRemove(i);
    console.log(data);
  }
}
main();