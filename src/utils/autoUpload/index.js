const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
// const test = require('../../../view/test/test.js');

const autoUpload = async (src = 'view/test') => {
  // test();
  const form = new FormData();
  const json = require(`../../../${src}/data.json`);
  const categories = {
    "꽃": 1, 
    "자연": 2,
    "동물": 5, 
    "줄무늬": 3, 
    "도트": 4, 
    "기하학": 6, 
    "타이포그래피": 2001, 
    "유아용": 8, 
    "나라별": 7, 
    "특이한 무늬": 10, 
    "기념일": 11, 
    "컷트지": 9, 
    "무지": 2002, 
    "굿디자이너": 2000
  }
  const originColors = ['893f26', '957d37', '768b3e', '307b43', '2e967b', '1b799f', '0a4681', '402a7f', '823386', 'aa145e', 'a40025', '000000', 'ff602c', 'ffcb2a', 'b3ef01', '06cc39', '09efb1', '2bc8ff', '2b5fff', '602bff', 'c119ea', 'eb3792', 'd20001', '6a6a6a', 'ffa181', 'ffdf80', 'd7f96e', '6def8f', '7fffde', '80dfff', '7fa0ff', 'a080ff', 'e270fc', 'f377b5', 'f4696c', 'd9d9d9', 'ffe9e1', 'fef1ce', 'eefbc5', 'c6fdd5', 'c0fdee', 'c2f0ff', 'c5d4ff', 'd6cbfd', 'f3bffd', 'ffd3f4', 'f8d0d1', 'ffffff'];
  const dataColors = json["color"];
  const realColors = [];
  for(let i of originColors) {
    if(dataColors.includes(i)) {
      realColors.push(i);
    }
  }

  const data = {
    "links_number": "",
    "magam_long": "0",
    "img0": "",
    "img1": "",
    "img2": "",
    "img3": "",
    "img4": "",
    "img5": "",
    "img6": "",
    "img7": "",
    "img8": "",
    "img9": "",
    "img10": "",
    "img11": "",
    "img12": "",
    "img13": "",
    "img14": "",
    "img15": "",
    "img16": "",
    "img17": "",
    "img18": "",
    "img19": "",
    "design_consen": "y",
    "design_consen2": "y",
    "design_consen2": "y",
    "product_name": json["KR-pattern"],
    "hongbo": json["KR-short"],
    "product_keyword": json["KR-search-keyword"],
    "category": categories[json["KR-category"]],
    "company": "",
    "type": "",
    "sub_type": "",
    "select_color": realColors.join('/'),
    "wt3d_product_numbers[]": "1000",
    "wt3d_product_numbers[]": "1079",
    "wt3d_product_numbers[]": "1038",
    "wt3d_product_numbers[]": "960",
    "wt3d_product_numbers[]": "1001",
    "comment": json["KR-comment"],
    "ex_comment": json["KR-comment"],
    "ex_size_width": "27",
    "ex_size_height": "27",
    "product_stats": "0",
    "focus": "0",
    "premium": "0",
    "susuryo": "0",
    "magam_long": "0",
    "default_price": "",
    "baesong_how": "",
    "baesong_type": "3",
    "baesong_cut_free": "",
    "baesongbi": "",
    "gou_number": "",
    "bold": "0",
    "icon": "0",
    "end_date": "",
    "end_day": "3650",
    "end_hour": "00",
    "end_minute": "00",
    "product_image": fs.createReadStream(`${src}/output.jpg`),
    "result_thumb": fs.createReadStream(`${src}/output.jpg`)
  }
  for(let [key, value] of Object.entries(data)) {
    form.append(key, value);
  }

  const formHeaders = form.getHeaders();

  const res = await axios.post('https://realfabric.net/product_add_reg.php', form, {
    headers: {
      ...formHeaders,            
      'Host': 'realfabric.net',
      'Cache-Control': 'max-age=0',
      'Sec-Ch-Ua': '"Not A(Brand";v="24", "Chromium";v="110"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"macOS"',
      'Upgrade-Insecure-Requests': '1',
      'Origin': 'https://realfabric.net',
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJEYJV8yHkc78UTsQ',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.78 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'iframe',
      'Referer': 'https://realfabric.net/product_add2.php',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Connection': 'close',
      'Cookie': `shop_member_id=${process.env.SHOP_MEMBER_ID}; shop_member_pass=${process.env.SHOP_MEMBER_PASS}`
    }
  })

  console.log(res.data);
}

module.exports = autoUpload;